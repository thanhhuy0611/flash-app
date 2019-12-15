import React, { useState, useEffect } from 'react';
import '../static/Weather.css';
import { css } from '@emotion/core';
import { CircleLoader, BeatLoader } from 'react-spinners';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


function Weather() {
  const [WeatherObject, setWeatherObject] = useState(null)
  const GetLocation = () => {
    navigator.geolocation.getCurrentPosition( //get a Object location 
      (position) => { //function with agrument is 'position' = Object  
        let lati = position.coords.latitude;
        let longi = position.coords.longitude;
        GetData(lati, longi);
      }
    )
  };
  useEffect(() => {
    GetLocation();
  }, [])

  const GetData = async (lat, lon) => {
    const ApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let reponsive = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${ApiKey}&units=metric`)
    let data = await reponsive.json();
    setWeatherObject(data);
  }

  console.log('WeatherObject', WeatherObject);
  if (!WeatherObject) {
    return (
      <>
        <div className='sweet-loading'>
          <CircleLoader
            css={override}
            sizeUnit={"px"}
            size={200}
            color={'#36D7B7'}
          />
          <div className={'loading'}>
            <h1 style={{ color: 'white' }}>Loading</h1>
            <BeatLoader
              css={override}
              sizeUnit={"px"}
              size={10}
              color={'white'}
            />
          </div>
        </div>
      </>
    )
  }
  return (
    <div>
      <div className="container-fluid text-white my-auto App-header">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h5 className="col-12">{WeatherObject && WeatherObject.name}</h5>
            <h3 className="col-12 text-success">Temperature: <span className="text-white">{WeatherObject !== null && WeatherObject.main.temp}°C</span></h3>
            <h5 className="col-12 text-success">Weather Description: <span className="text-white">{WeatherObject !== null && WeatherObject.weather[0].description}</span></h5>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Weather;
