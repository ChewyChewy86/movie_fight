//Search api..
const fetchID = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '664c3993',
      s: searchTerm
    }
  });

  if(response.data.Error) {
    console.log("Too many results")
    return [];
  }

  return response.data.Search;
};

const root =document.querySelector('.autocomplete');
root.innerHTML = `
<label for=""><b>Search For a Movie</b></label>
<input type="text" class="input">
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
  </div>
</div>
`

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = async event => {
  const movies = await fetchID(event.target.value);
  if(!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }

  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active')
  for(let movie of movies) {
    const option = document.createElement('a');
    const imgSrc = movie.Poster ==='N/A' ? '' : movie.Poster

    option.classList.add('dropdown-item')
    option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;

   resultsWrapper.appendChild(option)
  }
};

input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', event => {
  if(!root.contains(event.target)) {
    dropdown.classList.remove('is-active')
  }
})

