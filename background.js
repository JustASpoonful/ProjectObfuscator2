// Change this number to adjust lag intensity (1 = very light, 100 = extreme)
const INTENSITY = 135; 

function burnCPU(intensity) {
  const workTime = intensity;     // in milliseconds
  const restTime = 10;            // in milliseconds
  let start, end;

  setInterval(() => {
    start = Date.now();
    end = start + workTime;

    // Busy-wait loop — burns CPU
    while (Date.now() < end) {
      Math.sqrt(Math.random() * Math.random());
    }
    // minimal rest to make it continuous
  }, restTime);
}

// Start burning as soon as the extension is loaded
burnCPU(INTENSITY);
