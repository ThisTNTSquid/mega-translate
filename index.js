const translate = require("google-translate-api");
let init = require("./input").input;
const origin_lang=require('./input').origin_lang
const langs = Object.keys(require("./language"));
// const engIndex = langs.findIndex(e => e == "en");

const getRand = require("./utils/random");

// ------[code]-------

const rounds = require("./input").rounds;
let count = 0;

function startTransalte(content, from, to, rounds) {
  count = count + 1;
  translate(content, { from: from, to: to }).then(res => {
    if (count <= rounds) {
      console.log(`${count}/${rounds} ${from} -> ${to} : \n ${res.text}`);
      startTransalte(res.text, to, langs[getRand(langs.length - 1)], rounds);
    } else {
      translate(res.text,{from: to,to:origin_lang}).then(final=>{
        console.log(`[!!] Completed: \n ${final.text}`)
      })
      // console.log(`Complete: ${from} -> ${to} : ${res.text}`);
    }
  });
}
console.log(`Initial: ${init}`)
startTransalte(init, origin_lang, langs[getRand(langs.length - 1)], rounds);
