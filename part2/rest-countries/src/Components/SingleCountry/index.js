import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";

const SingleCountry = (props) => {
    const {name: {common:title}, capital, area, languages, flags: { png: flag }, capitalInfo: { latlng }} = props
    const [showWeather, setShowWeather] = useState(null)
    const weatherAPIKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        const getWeather = async () => {
            try {
                const [lat, lon] = latlng
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`)
                setShowWeather(res.data)
            } catch (e) {
                console.error(e)
            }
        }
        getWeather()
    }, [])

    const getWeatherIcon = () => {
        const icon = showWeather.weather[0].icon
        const URL = `http://openweathermap.org/img/wn/${icon}@2x.png`
        return URL
    }

    const URL = showWeather ? getWeatherIcon() : 'http://openweathermap.org/img/wn/10d@2x.png';

    return (
        <>
        <h1>{title}</h1>
            <p>capital : {capital}</p>
            <p>area : {area}</p>
            <h2>Languages</h2>
            <ul>{Object.values(languages).map((c) => <li key={c}>{c}</li>)}</ul>
            {flag && <img src={flag}/>}
            <h1>Weather in {capital}</h1>
            <p>temperature : {showWeather && Math.floor(showWeather.main?.temp - 273.15)} Celcius</p>
            <img src={URL}/>
            <p>wind : {showWeather && Math.floor(showWeather.wind?.speed)} m/s</p>
        </>
    )
}
export default SingleCountry