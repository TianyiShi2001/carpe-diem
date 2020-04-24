import * as juration from "juration";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function secondsToHHMM(seconds) {
  const hours = ~~(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = ~~(seconds / 60);

  let res = "";
  hours !== 0 && (res += hours.toString() + (hours === 1 ? " hour " : " hours "));
  minutes !== 0 && (res += minutes.toString() + (minutes === 1 ? " minute" : " minutes"));

  return res;
}

export function secondsToHHMMSS(seconds) {
  let hours: number | string = ~~(seconds / 3600);
  seconds -= hours * 3600;
  let minutes: number | string = ~~(seconds / 60);
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

export function parseDuration(durationString): number | undefined {
  try {
    return juration.parse(durationString);
  } catch (e) {
    return undefined;
  }
}
