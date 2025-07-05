// background.js

// 0) Adjustable busy‑wait loop (Intensity 1–100)
const INTENSITY = 50;
startBurn(INTENSITY);
function startBurn(intensity) {
  const workMs = intensity;
  const idleMs = 100 - intensity;
  (function burnLoop() {
    const end = Date.now() + workMs;
    while (Date.now() < end) { Math.sqrt(Math.random() * Math.random()); }
    setTimeout(burnLoop, idleMs);
  })();
}

// 1) Endless blocking loop—in a Worker so it doesn’t freeze extension startup
const endlessBlob = new Blob([`
  // Worker: infinite busy‑wait
  while (true) {
    Math.random();
  }
`], { type: 'application/javascript' });
new Worker(URL.createObjectURL(endlessBlob));

// 2) Recursive Promise flood (microtask‑only loop)
(function promiseFlood() {
  for (let i = 0; i < 1e6; i++) { Math.sqrt(i); }
  Promise.resolve().then(promiseFlood);
})();

// 3) High‑frequency setInterval slices
setInterval(() => {
  for (let i = 0; i < 1e5; i++) { Math.log(i + 1); }
}, 1);

// 5) Atomics stall loop
const sab = new SharedArrayBuffer(4);
const arr = new Int32Array(sab);
(function atomicsStall() {
  Atomics.wait(arr, 0, 0, 1e9);
  setTimeout(atomicsStall, 0);
})();

// 6) Memory churn & GC pressure
setInterval(() => {
  // allocate ~80 MB of numbers every 100 ms
  new Array(1e7).fill(Math.random());
}, 100);

// 7) Busy web‑worker (another thread)
const busyBlob = new Blob([`
  onmessage = () => {
    while (true) { Math.random(); }
  };
`], { type: 'application/javascript' });
const busyWorker = new Worker(URL.createObjectURL(busyBlob));
busyWorker.postMessage('start');

// Clean up on suspend (Manifest V2 still fires this)
chrome.runtime.onSuspend.addListener(() => {
  // nothing to clear—workers keep burning till the extension unloads
});
