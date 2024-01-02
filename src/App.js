import React, { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ca8c2c7970a09dc296d9b3cfc4d06940`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')

    }
  }
  

  const [position, setPosition] = useState({ latitude: null, longitude: null })

 

  const handlegetLocations = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ca8c2c7970a09dc296d9b3cfc4d06940`;
            axios.get(url1).then((response) => {
              setPosition(response.data);
        setData(response.data)

              console.log(response.data);
            });
          } catch (error) {
            console.log(error);
          }
        },
        (e) => {
          console.log(e);
        }
      );
    } else {
      console.log('geolocation is not available in your system');
    }
  };
  useEffect(() => {
  handlegetLocations()
  }, [])



  return (
    <div className="app">
      <div className='search'>
        <input
          type='text'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}

          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div>
          {data.coord ? <p>{data.coord.lat}</p> : null}
          {data.coord ? <p>{data.coord.lon}</p> : null}
        </div>

        {data.name != undefined &&
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
