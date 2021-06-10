let $ = (el) => document.querySelector(el);
let $$ = (el) => Array.from(document.querySelectorAll(el));
let $on = (el, ev, fn) =>
  Array.isArray(el)
    ? el.forEach((o) => $on(o, ev, fn))
    : el.addEventListener(ev, fn);

function searchNews(el) {
  //   let response = await fetch(
  //     `http://newsapi.org/v2/everything?q=${el}&from=2021-06-10&sortBy=popularity&apiKey=${apiKey}`
  //   );
  //   let data = await response.json();
  //   return data;

  fetch(
    `http://newsapi.org/v2/everything?q=${el}&from=2021-06-10&sortBy=popularity&apiKey=${apiKey}`
  )
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        let data = res.articles;
      }
    });
}

// searchNews('Apple');

function topgGermany() {
  fetch(`http://newsapi.org/v2/top-headlines?country=de&apiKey=${apiKey}`)
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        let data = res.articles;
        console.log(data);
      }
    });
}

$on(window, 'DOMContentLoaded', topgGermany);

new Date(e.publishedAt).toLocaleDateString();
