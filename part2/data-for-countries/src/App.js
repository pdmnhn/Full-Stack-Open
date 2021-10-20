import { useEffect, useState } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ place }) => {
  const [temp, setTemp] = useState(null);
  const [iconURL, setIconURL] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [windDir, setWindDir] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${place}`;

    axios.get(url).then((res) => {
      if (!isSubscribed) return;

      const current = res.data.current;

      setTemp(current.temperature);
      setIconURL(current.weather_icons[0]);
      setWindSpeed(current.wind_speed);
      setWindDir(current.wind_dir);
    });

    return () => (isSubscribed = false);
  }, [place]);

  return (
    <>
      {temp === null ||
      iconURL === null ||
      windSpeed === null ||
      windDir == null ? (
        <></>
      ) : (
        <>
          <h2>Weather in {place}</h2>
          <div>
            <strong>temperature: </strong> Celcius {temp}
          </div>
          <img src={iconURL} alt="" />
          <div>
            <strong>wind: </strong> {windSpeed} mph direction {windDir}
          </div>
        </>
      )}
    </>
  );
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {Object.keys(country.languages).map((lan) => (
          <li key={lan}>{country.languages[lan]}</li>
        ))}
      </ul>
      <img src={country["flags"]["png"]} alt="" style={{ maxWidth: "100px" }} />
      <Weather place={country.capital[0]} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      console.log("fetching data");
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [filterText, countries]);

  const showCountry = (country) => {
    return (event) => {
      setFilteredCountries([country]);
    };
  };

  const filterInputOnChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <>
      <div>
        find countries
        <input value={filterText} onChange={filterInputOnChange} />
      </div>
      {filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        filteredCountries.map((country) => (
          <div key={country.name.official}>
            {country.name.common}{" "}
            <button onClick={showCountry(country)}>show</button>
          </div>
        ))
      )}
    </>
  );
};

export default App;
