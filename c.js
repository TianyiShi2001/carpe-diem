let chrono = require("chrono-node");

// let moment = require("moment-timezone");
// console.log(moment().toString());
// console.log(moment.tz.guess());
// console.log(moment("2020-02-02 15:00").tz(moment.tz.guess()).toString());

let { DateTime, LocalZone } = require("luxon");
let d = DateTime.fromJSDate(chrono.parseDate("yesterday 13:50"));
console.log(d.toString());
let nd = DateTime.fromISO(d.toString(), { zone: "Asia/Tokyo" });
console.log(nd.toString());
console.log(nd.zoneName);
console.log(nd.hour);

console.log(DateTime.local().toString());
