'use strict';

let $ = (el) => document.querySelector(el);
let $$ = (el) => Array.from(document.querySelectorAll(el));
let $on = (el, ev, fn) =>
  Array.isArray(el)
    ? el.forEach((o) => $on(o, ev, fn))
    : el.addEventListener(ev, fn);

class News {
  counter = 0;
  newsData;

  async searchNews(el = undefined, key) {
    let url = `http://newsapi.org/v2/everything?q=${el}&from=2021-06-10&sortBy=popularity&apiKey=${key}`;
    let startUrl = `http://newsapi.org/v2/top-headlines?country=de&apiKey=${key}`;
    let response = await fetch(!el ? startUrl : url);
    let data = await response.json();
    this.newsData = data.articles;
  }

  renderHtml(from, to) {
    $('#actualNews').innerHTML = '';
    this.newsData
      .slice(from ? from : this.counter, to ? to : this.counter + 4)
      .forEach((e) => {
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

  getLocationAndWeather() {
    fetch('http://extreme-ip-lookup.com/json/')
      .then((res) => res.json())
      .then((res) => {
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${res.city}&appid=${weatherApi}&units=metric`
        )
          .then((res) => res.json())
          .then((json) => {
            $('#weather').innerHTML = `
        <span class="weatherIcon">
                <img src="http://openweathermap.org/img/wn/${
                  json.weather[0].icon
                }@2x.png">
        </span>
        <span class="temp">
          <span class="styleWeather">${Math.floor(json.main.temp)}°C</span>
          <span class="styleWeather2">${Math.floor(json.main.temp_max)}°</span>
          <span class="styleWeather3">${Math.floor(json.main.temp_min)}°</span>
        </span>
        `;
          });
      });
  }
}

let myNews = new News();
myNews.getLocationAndWeather();

$on(window, 'DOMContentLoaded', async () => {
  $('#buttonLeft').style.display = 'none';
  myNews.counter = 0;
  await myNews.searchNews(undefined, apiKey);

  $('#titleNews').innerHTML = `Actual news in German`;

  myNews.renderHtml();
});

$on($('#buttonLeft'), 'click', () => {
  if (myNews.counter === 0 || !myNews.newsData) {
    $('#buttonLeft').style.display = 'none';
    return;
  }
  $('#buttonRight').style.display = 'block';
  myNews.counter -= 4;
  myNews.renderHtml();
});

$on($('#buttonRight'), 'click', () => {
  if (myNews.counter === 16 || !myNews.newsData) {
    $('#buttonRight').style.display = 'none';
    return;
  }
  $('#buttonLeft').style.display = 'block';

  myNews.counter += 4;
  myNews.renderHtml();
});

$on($('#Search'), 'keypress', async (e) => {
  if (e.key == 'Enter' && $('#Search').value) {
    $('#titleNews').innerHTML = $('#Search').value;
    myNews.counter = 0;
    await myNews.searchNews($('#Search').value, apiKey);
    myNews.renderHtml();
  }
});

$on($$('.items'), 'click', async (e) => {
  myNews.counter = 0;
  $('#titleNews').innerHTML = e.target.innerHTML;
  await myNews.searchNews(e.target.innerHTML.toLowerCase(), apiKey);
  myNews.renderHtml();
});

$on(window, 'resize', () => {
  if (window.innerWidth <= 580) {
    $('#buttonLeft').style.display = 'none';
    $('#buttonRight').style.display = 'none';
    myNews.renderHtml(0, 19);
  } else {
    myNews.renderHtml();
    $('#buttonRight').style.display = 'block';
  }
});

function barmenu(a) {
  a.classList.toggle('chang');
}
