import React,{ useState, useEffect } from 'react';

import './app.css'
const API_KEY = "c9c2bd46ebea6b933d5f30e9750e81fb";


export default function App() {

  const currentDate = new Date();
  const monthe = currentDate.getMonth();
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState("");
  const [place, setPlace] = useState("Dhaka");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`

  const fetchData = async (url) =>{
    setIsLoading(true);

    try{
      const response = await fetch(url);
    const data = await response.json();
    setCountries(data);
    setIsLoading(false);
    setError(null);
    }catch(error){
      setIsLoading(false);
      setError(error);
    }

  };



  useEffect(()=>{
    fetchData(url);
  },[]);

  const handleInput = (e)=>{
    setPlace(e.target.value);
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    fetchData(url);
    setCountries("");
  }


  return (
    <>
        

        <div className="app">
        <h2>Weather App</h2>
        {isLoading && <h2>Loading...</h2>
        }
        {
          error && <h2>{error.message}</h2>
        }
        {
          countries && (
            <>
            <div className="container">
                <div className="date-container">
                  <h4>{date}/{monthe+1}/{year}</h4>
                </div>
                <h2>{countries.name}</h2>
                <img src="../8908652.png" alt="" />
                <h2>{countries.main.temp}</h2>
                <p>{countries.weather[0].main}</p>
                <form onSubmit={handleSubmit}>
                <div className='input-container'>
                   <input type="text" onChange={handleInput}  placeholder='Enter your place...' required/>
                   <button type='submit'>GET</button>
                </div>
                </form>
              </div>
            
            </>
          )
        }


        </div>

         

         
    </>
  )
}
