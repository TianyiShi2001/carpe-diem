const data = require("data-store")(".carpe-diem");
console.log(data.get("foo.bar.deep"));
