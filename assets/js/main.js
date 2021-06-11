let $ = (el) => document.querySelector(el);
let $$ = (el) => Array.from(document.querySelectorAll(el));
let $on = (el, ev, fn) =>
  Array.isArray(el)
    ? el.forEach((o) => $on(o, ev, fn))
    : el.addEventListener(ev, fn);

let counter = 0;
let newsData;

async function searchNews(el) {
  let response = await fetch(
    `http://newsapi.org/v2/everything?q=${el}&from=2021-06-10&sortBy=popularity&apiKey=${apiKey}`
  );
  let data = await response.json();
  return data.articles;
}

async function topgGermany() {
  let response = await fetch(
    `http://newsapi.org/v2/top-headlines?country=de&apiKey=${apiKey}`
  );
  let data = await response.json();
  return data.articles;
}

function renderHtml(data) {
  $('#actualNews').innerHTML = '';
  let sliceData = data.slice(counter, counter + 4);
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
//test
$on(window, 'DOMContentLoaded', async (e) => {
  newsData = await topgGermany();
  $('#titleNews').innerHTML = `actual news from Germany`;
  counter = 0;
  renderHtml(newsData);
});

$('#buttonLeft').addEventListener('click', (e) => {
  if (counter === 0 || !newsData) {
    return;
  }
  counter -= 4;
  renderHtml(newsData);
});

$('#buttonRight').addEventListener('click', (e) => {
  if (counter === 16 || !newsData) {
    return;
  }
  counter += 4;
  renderHtml(newsData);
});

$('#Search').addEventListener('keypress', async (e) => {
  console.log(e.key);
  if (e.key == 'Enter') {
    if ($('#Search').value) {
      $('#titleNews').innerHTML = $('#Search').value;
      counter = 0;
      newsData = await searchNews($('#Search').value);
      renderHtml(newsData);
    }
  }
});
