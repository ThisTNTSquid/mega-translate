const translate = require("google-translate-api");
const config = require("./config");
const fs = require("fs");
const init = fs.readFileSync(config.input, "utf-8");
const langs = Object.keys(require("./utils/language"));
const Logger = require('./utils/logger')
const logger = new Logger()
// const engIndex = langs.findIndex(e => e == "en");

const getRand = require("./utils/random");

// ------[code]-------

const rounds = require("./config").rounds;
let count = 0;

function startTransalte(content, from, to, rounds) {
  count = count + 1;
  translate(content, { from: from, to: to })
    .then(res => {
      if (count <= rounds) {
        logger.log(
          `${count}/${rounds} ${from} -> ${to} : \n------------------------------\n${
            res.text
          }\n------------------------------\n\n`
        );
        startTransalte(res.text, to, langs[getRand(langs.length - 1)], rounds);
      } else {
        translate(res.text, { from: to, to: config.origin_lang }).then(
          final => {
            logger.log(
              `[!!] Completed [!!]:\n**************************** \n${
                final.text
              }\n****************************\n`
            );
            fs.writeFile(config.output, final.text, "utf-8", () => {
              // console.log("\n===============");
              logger.log(
                `> Your interesting output has been saved to '${config.output}'`
              );
              logger.complete()
              // console.log("===============");
            });
          }
        );
        // console.log(`Complete: ${from} -> ${to} : ${res.text}`);
      }
    })
    .catch(err => {
      logger.log(err);
    });
}
logger.log(
  `Initial: \n------------------------------\n${init}\n------------------------------\n\n`
);
startTransalte(
  init,
  config.origin_lang,
  langs[getRand(langs.length - 1)],
  rounds
);
