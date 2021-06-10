let $ = (el) => document.querySelector(el);
let $$ = (el) => Array.from(document.querySelectorAll(el));
let $on = (el, ev, fn) =>
  Array.isArray(el)
    ? el.forEach((o) => $on(o, ev, fn))
    : el.addEventListener(ev, fn);

let data;
let searchTerm;

fetch(
  `http://newsapi.org/v2/everything?q=${searchTerm}&from=2021-06-10&sortBy=popularity&apiKey=${apiKey}`
)
  .then((res) => res.json())
  .then((res) => console.log(res));
