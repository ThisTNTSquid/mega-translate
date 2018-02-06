const fs = require("fs");
class Logger {
  constructor() {
    fs.mkdirSync("../log");
    let date = new Date();
    fs.writeFile(`../logs/log-${date.getFullYear}-${date.getMonth}-${date.getDate}-${date.getTime}.txt`,'');
    this.logStream = fs.createWriteStream(
      `../logs/log-${date.getFullYear}-${date.getMonth}-${date.getDate}-${
        date.getTime
      }.txt`,
      { flag: "a" }
    );
  }
  log(text) {
    // fs.writeFile(this.filename, text);
    this.logStream.write(text);
  }
  complete() {
    this.logStream.end("");
  }
}

module.exports = Logger;
