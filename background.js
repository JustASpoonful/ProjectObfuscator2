// Change this number to adjust lag intensity (1-100)
const INTENSITY = 20;

let burnInterval;

function startBurn(intensity) {
  const work = intensity;
  const idle = 100 - intensity;
  burnLoop(work, idle);
}

function burnLoop(workMs, idleMs) {
  const end = Date.now() + workMs;
  while (Date.now() < end) {
    Math.sqrt(Math.random() * Math.random());
  }
  burnInterval = setTimeout(() => burnLoop(workMs, idleMs), idleMs);
}

startBurn(INTENSITY);

chrome.runtime.onSuspend.addListener(() => {
  clearTimeout(burnInterval);
});
