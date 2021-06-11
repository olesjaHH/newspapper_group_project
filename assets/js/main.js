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

function topgGermany() {
  fetch(`http://newsapi.org/v2/top-headlines?country=de&apiKey=${apiKey}`)
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        renderHtml(res.articles);
      }
    });
}

function renderHtml(data) {
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

$on(window, "DOMContentLoaded", topgGermany);






	
$on(window, 'DOMContentLoaded', topgGermany);

$('#buttonLeft').addEventListener('click', () => {
  if (counter === 0) {
    e.disabled = true;
  } else {
    counter -= 4;
    renderHtml(newsData);
  }
});

$('#buttonRight').addEventListener('click', () => {
  if (counter === 20) {
    e.disabled = true;
  } else {
    counter += 4;
    renderHtml(newsData);
  }
});

$('.btn').addEventListener('click', async () => {
  if ($('#Search').value) {
    counter = 0;
    newsData = await searchNews($('#Search').value);
    renderHtml(newsData);
  }
});

