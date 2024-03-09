/* Dependencies */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import reservamosImage from "../assets/images/reservamos.png";

function Searcher() {
  /* Use States */
  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [clickedInput, setClickedInput] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [originalPlaces, setOriginalPlaces] = useState([]);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [cityLat, setCityLat] = useState('');
  const [cityLong, setCityLong] = useState('');
  const [weather, setWeather] = useState('');

  /* Get the available places to show them into the search list */
  const fetchDataReservamosPlaces = async () => {
    try {
      const response = await axios.get('https://search.reservamos.mx/api/v2/places');
      return response.data.filter(place => place.result_type === 'city');
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPlaces = await fetchDataReservamosPlaces();
      setOriginalPlaces(fetchedPlaces);
    };

    fetchData();
  }, []);

  /* Get the Lat and Long */
  const fetchDataLatAndLog = async () => {
    const latLogAPI = 'https://search.reservamos.mx/api/v2/places?q=';
    const fetchDataLatAndLogURL = latLogAPI + city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');

    try {
      var response = await axios.get(fetchDataLatAndLogURL);
      const cityData = response.data;
      
      cityData.forEach(element => {
        if (element.result_type === 'city') {
          setCityLat(element.lat);
          setCityLong(element.long);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  /* Get the temperature */
  const fetchDataWeather = async () => {
    const fetchDataWeatherAPIKey = '0eebd1fcf852d29ca0340c5c451d4c9a';
    const fetchDataWeatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ cityLat +'&lon='+ cityLong +'&appid='+ fetchDataWeatherAPIKey;

    console.log(fetchDataWeatherAPI);
    try {
      const response = await axios.get(fetchDataWeatherAPI);
      
      console.log(response.data);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (cityLat && cityLong) {
        try {
          const response = await fetchDataWeather(); 
          setWeather(response.data); 
          console.log(weather);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };
  
    fetchWeather();
  }, [cityLat, cityLong]);
  

  /* Form handlers */
  const handleClickInput = () => {
    setClickedInput(true);
    setPlaces(originalPlaces);
  };

  const handleClickPlace = (placeName) => {
    setCity(placeName);
    setSelectedPlace(placeName);
    setClickedInput(false);
  };

  const handleChange = (event) => {
    const inputCity = event.target.value;
    setCity(inputCity);
    setSelectedPlace(null);
    if (inputCity.trim() !== '') {
      const filteredPlaces = originalPlaces.filter(place =>
        place.city_name.toLowerCase().startsWith(inputCity.toLowerCase())
      );
      setPlaces(filteredPlaces);
    } else {
      setPlaces(originalPlaces);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDataLatAndLog();
  };

  /* Close the places list when clicking outside of it*/
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        inputRef.current && inputRef.current.contains(event.target) ||
        listRef.current && listRef.current.contains(event.target)
      ) {
        return;
      }
      setClickedInput(false);
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className='searcher container pt-5 h-100 w-100'>
        <div className="row d-flex justify-content-center text-center w-100">
          <div className="col-12">
            <img className='searcher--logo' src={reservamosImage} alt="" />

            <h1 className='searcher--title pt-4'>Ingresa una ciudad para <br /> conocer su clima por los próximos días</h1>
          
            <div className='searcher--input-box mx-auto pt-4'>
              {/* Input text */}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Nombre de la ciudad"
                  value={selectedPlace !== null ? selectedPlace : city}
                  onChange={handleChange}
                  onClick={handleClickInput}
                  ref={inputRef}
                  className='searcher--input-box--input'
                />
              
                <button type="submit" className="searcher--input-box--submit btn btn-primary ms-3" id='submitButton' disabled={!selectedPlace}>Submit</button>
              </form>
              
              {/* Cities (Places) */}
              <div className='searcher--input-box--list ms-4 mt-2'>
                {clickedInput && (
                  <ul className='ps-0 mb-0' ref={listRef}>
                    {places.map((place, index) => (
                      <li key={index} onClick={() => handleClickPlace(place.city_name)}>{place.city_name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {weather && (
          <div className="row mt-5 d-flex justify-content-center text-center pt-5">
            <div className="col-12 mt-5">
              {weather.list.slice(0, 5).map((day, index) => (
                <div className='searcher--days-container d-inline-block ms-5' key={index}>
                  <h2 className='searcher--days-container--title'>Día {index + 1}</h2>
                  <strong className='searcher--days-container--text mt-2 d-inline-block'>{day.main.temp}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Searcher;
