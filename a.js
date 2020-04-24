async function timer(countDown) {
  let elapsed = 0;
  if (countDown) {
    for (;;) {
      process.stdout.write("\u001b[2K\u001b[0E");
      process.stdout.write(`Time Elapsed: ${secondsToHHMMSS(elapsed)} | Time remaining: ${secondsToHHMMSS(countDown)}`);
      await sleep(1000);
      elapsed++;
      countDown--;
    }
  } else {
    for (;;) {
      process.stdout.write("\u001b[2K\u001b[0E");
      process.stdout.write(`Time Elapsed: ${secondsToHHMMSS(elapsed)}`);
      await sleep(1000);
      elapsed++;
    }
  }
}
function secondsToHHMMSS(seconds) {
  let hours = ~~(seconds / 3600);
  seconds -= hours * 3600;
  let minutes = ~~(seconds / 60);
  seconds -= minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
timer(8000).then(console.log).catch(console.error);
