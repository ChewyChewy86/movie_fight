//Search api..
const fetchID = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '664c3993',
      s: searchTerm
    }
  });

  console.log(response.data);
};


const input = document.querySelector('input');


const onInput = debounce(event => {
  fetchID(event.target.value)
});

input.addEventListener('input', debounce(onInput, 500));

