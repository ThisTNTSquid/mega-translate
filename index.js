const translate = require("google-translate-api");
const config = require("./config"); //todo chane this line to read file with path provided in config
const init = require("fs").readFileSync(config.input,'utf-8');
const langs = Object.keys(require("./utils/language"));
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
        console.log(`${count}/${rounds} ${from} -> ${to} : \n${res.text}\n`);
        startTransalte(res.text, to, langs[getRand(langs.length - 1)], rounds);
      } else {
        translate(res.text, { from: to, to: config.origin_lang }).then(
          final => {
            console.log(`[!!] Completed: \n${final.text}`);
          }
        );
        // console.log(`Complete: ${from} -> ${to} : ${res.text}`);
      }
    })
    .catch(err => {
      console.log(err);
    });
}
console.log(`Initial: \n${init}`);
startTransalte(
  init,
  config.origin_lang,
  langs[getRand(langs.length - 1)],
  rounds
);
