import './App.css';
import {useState, useEffect} from "react";
import axios from "axios";
import SingleCountry from "./Components/SingleCountry";

function App() {
    const [countryList, setCountryList] = useState([])
    const [country, setCountry] = useState('')
    const [showCountry, setShowCountry] = useState(null)

    useEffect(() => {
        const getCountryList = async () => {
            try {
                const res = await axios.get('https://restcountries.com/v3.1/all')
                console.log(res.data)
                setCountryList(res.data)
            } catch (e){
                console.error(e)
            }
        }
        getCountryList()
    },[])

    const filteredCountryList = countryList.filter(({name: {common}}) => country !== '' && common.toLowerCase().includes(country.toLowerCase()))

    useEffect(() => {
        if(filteredCountryList.length === 1)  setShowCountry(filteredCountryList[0])
    },[countryList])


    const handleCountry = (e) => {
        setShowCountry(null)
        setCountry(e.target.value)
    }

    const component = filteredCountryList.length > 10 ? <p>Too many results, be more specific</p>
        : filteredCountryList.map((country) => <li key={country.population}>{country.name.common} <button onClick={() => setShowCountry(country)}>show</button></li>)


    return (
        <>
            <div>find countries <input value={country} onChange={handleCountry}/></div>
            <ul>
               {showCountry ? null : component}
            </ul>
            {showCountry ? <SingleCountry {...showCountry}/> : null}
        </>
    );
}

export default App;
