import "./scss/styles.scss";

const API_KEY = process.env.API_KEY;


const getTemperature = async () => {
    try {
      const cityName = document.getElementById('cityName').value;
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&lang=es&units=metric`;
      const response = await fetch(API_URL);
      const data = await response.json();
      
      const temperature = data.main.temp;
      const country = data.sys.country;
      const iconCode = data.weather[0].icon;
      const descrip = data.weather[0].description;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
 
      // Creo un nuevo div para esta ciudad
      const cityDiv = document.createElement('div');
      cityDiv.classList.add('city');
  
      // Agrego la información de la ciudad al nuevo div
      const cityNameDiv = document.createElement('div');
      cityNameDiv.classList.add('cityName');
      cityNameDiv.textContent = `${cityName}, ${country}`;
      cityDiv.appendChild(cityNameDiv);
  
      const tempDiv = document.createElement('div');
      tempDiv.classList.add('temp');
      tempDiv.textContent = `${temperature} °C`;
      cityDiv.appendChild(tempDiv);
  
      const imgDiv = document.createElement('img');
      imgDiv.classList.add('weatherImg');
      imgDiv.src = iconUrl;
      cityDiv.appendChild(imgDiv);

      const description = document.createElement('p');
      description.classList.add('pDesc');
      description.textContent = `${descrip}`;
      cityDiv.appendChild(description);

      // Agrego el nuevo div al div de resultados
      const resultsDiv = document.getElementById('results');
      resultsDiv.appendChild(cityDiv);
  
      // Agrego un botón para eliminar la información de la ciudad
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('cityButton');
      deleteButton.textContent = 'Remove';
      deleteButton.addEventListener('click', () => {
        resultsDiv.removeChild(cityDiv);
      });
      cityDiv.appendChild(deleteButton);
    } catch (error) {
      console.error(error);
      cityName.classList.add('bad-input');
      cityName.placeholder = "Write a valid City";
    }
    cityName.value = "";
    cityName.focus();
  };
  
  const button = document.getElementById('getTemp');
  const cityNam = document.getElementById('cityName');


  // valido que no este vacio
  button.addEventListener('click', async (event) => {
    //event.preventDefault();
    cityNam.classList.remove('bad-input');
    cityNam.placeholder = "Write a City";
    const city = cityNam.value;
    if (!city) {
      cityNam.classList.add('bad-input');
      cityNam.placeholder = "Write a valid City";
      cityNam.focus();
      return;
    } else { 
    getTemperature();
  }
  });