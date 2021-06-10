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
        $('#actualNews').innerHTML = '';
        rendorHtml(res);
      }
    });
}
$('.btn').addEventListener('click', (e) => {
  if ($('#Search').value) {
    searchNews($('#Search').value);
  }
});
// searchNews('Apple');

function topgGermany() {
  fetch(`http://newsapi.org/v2/top-headlines?country=de&apiKey=${apiKey}`)
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        rendorHtml(res);
      }
    });
}

function rendorHtml(data) {
  let myData = data.articles;
  let sliceData = myData.slice(0, 6);
  sliceData.forEach((e) => {
    $('#actualNews').innerHTML += `
        <article id="topNews1">
        <img src="${e.urlToImage}" alt="" class="urlToImage">
        <p class="author">${e.author} <span class="published">${new Date(
      e.publishedAt
    ).toLocaleDateString()}</span></p>
        <h2 class="title">${e.title}</h2>
        <p class="content">${e.content}.</p>
        </article>`;
  });
}

$on(window, 'DOMContentLoaded', topgGermany);
