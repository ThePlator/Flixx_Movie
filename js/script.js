const global = {
  currentPage: window.location.pathname,
  api: {
    apiKey: 'a69ca1320a3daff42780761fa3f707f8',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

//Display 20 most popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
           <a href="movie-details.html?id=${movie.id} ">
               ${
                 movie.poster_path
                   ? `<img
                 src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                 class="card-img-top"
                 alt="${movie.title}"
               />`
                   : `<img
                 src="images/no-image.jpg"
                 class="card-img-top"
                 alt="${movie.title}"
               />`
               }
             </a>
             <div class="card-body">
               <h5 class="card-title">${movie.title} </h5>
               <p class="card-text">
                 <small class="text-muted">Release: ${
                   movie.release_date
                 } </small>
               </p>
             </div>
           `;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

//display 20 most popular tv shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

//Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_key = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_key}&laguage=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movies-details');
      break;
    case '/tv-details.html':
      console.log('Tv-details');
      break;
    case '/search.html':
      console.log('search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
