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

function renderHtml(data, from, to) {
  $('#actualNews').innerHTML = '';
  let sliceData = data.slice(from ? from : counter, to ? to : counter + 4);
  sliceData.forEach((e) => {
    $('#actualNews').innerHTML += `
        <article id="topNews1">
        <div class="img-container">
        <img src="${
          e.urlToImage
            ? e.urlToImage
            : 'data:image/jpeg;base64,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'
        }" alt="" class="urlToImage">
        </div>
        <p class="author">${
          e.author ? e.author : 'Unbekannt'
        } <span class="published">${new Date(
      e.publishedAt
    ).toLocaleDateString()}</span></p>
        <h2 class="title">${e.title}</h2>
        <p class="content">${e.content}.</p>
        </article>`;
  });
}

(function getLocationAndWeather() {
  fetch('http://extreme-ip-lookup.com/json/')
    .then((res) => res.json())
    .then((res) => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${res.city}&appid=${weatherApi}`
      )
        .then((res) => res.json())
        .then((res) => console.log(res));
    });
})();

//test
$on(window, 'DOMContentLoaded', async (e) => {
  $('#buttonLeft').style.display = 'none';

  newsData = await topgGermany();
  $('#titleNews').innerHTML = `Actual news in German`;
  counter = 0;
  renderHtml(newsData);
});

$('#buttonLeft').addEventListener('click', (e) => {
  if (counter === 0 || !newsData) {
    $('#buttonLeft').style.display = 'none';

    return;
  }
  $('#buttonRight').style.display = 'block';

  counter -= 4;
  renderHtml(newsData);
});

$('#buttonRight').addEventListener('click', (e) => {
  if (counter === 16 || !newsData) {
    $('#buttonRight').style.display = 'none';

    return;
  }
  $('#buttonLeft').style.display = 'block';

  counter += 4;
  renderHtml(newsData);
});

$('#Search').addEventListener('keypress', async (e) => {
  if (e.key == 'Enter') {
    if ($('#Search').value) {
      $('#titleNews').innerHTML = $('#Search').value;
      counter = 0;
      newsData = await searchNews($('#Search').value);
      renderHtml(newsData);
    }
  }
});

$on($$('.items'), 'click', async (e) => {
  counter = 0;
  $('#titleNews').innerHTML = e.target.innerHTML;
  newsData = await searchNews(e.target.innerHTML.toLowerCase());
  renderHtml(newsData);
});

$on(window, 'resize', () => {
  console.log(window.innerWidth);
  if (window.innerWidth <= 580) {
    $('#buttonLeft').style.display = 'none';
    $('#buttonRight').style.display = 'none';
    renderHtml(newsData, 0, 19);
  } else {
    renderHtml(newsData);
    $('#buttonRight').style.display = 'block';
  }
});
