const fs = require("fs");
class Logger {
  constructor() {
    if (!fs.existsSync(__dirname + "/../logs")) {
      fs.mkdirSync(__dirname + "/../logs");
    }
    let date = new Date();
    let timestring = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`;
    let filename = `${__dirname}/../logs/log-${timestring}.txt`;
    fs.writeFile(filename, timestring+'\n',()=>{
      console.log('Logging started')
    });
    this.logStream = fs.createWriteStream(filename, { flag: "a" });
  }
  log(text) {
    // fs.writeFile(this.filename, text);
    this.logStream.write(text,'utf-8');
    console.log(text)
  }
  complete() {
    this.logStream.end("");
  }
}

module.exports = Logger;
