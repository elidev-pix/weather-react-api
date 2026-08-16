import { useEffect, useState } from 'react'

const api = {
    key : import.meta.env.API_KEY,
    base : import.meta.env.API_BASE
  }

function App() {

  const [search, setSearch] = useState("Ouagadougou");
  const [weather, setWeather] = useState({})

  const searchPressed = (city = "Ouagadougou") => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}&lang=fr`)
    .then( response => response.json())
    .then(result => {
      setWeather(result);
      console.log(result)
    });
  }

   useEffect(() => {
    searchPressed()
  }, [])

  return (
    <div className='min-h-screen justify-center items-center '>
      <div className="flex flex-col px-2 py-3 rounded-md justify-center items-center">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <a href='https://github.com/elidev-pix'>elidev-pix</a>
            <span>Weather App</span>
          </div>
          <span className="italic">A React-powered weather application built with real-time weather APIs</span>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <input 
              type="text" 
              placeholder="Rechercher"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button 
              className=""
              onClick={searchPressed}
            >
              Rechercher...
            </button>
          </div>
          

          <p>Ville : {weather.name ?? ""}</p>
          <p>Pays : {weather.sys?.country ?? ""}</p>

          <span>Latitude : {weather.coord?.lat ?? ""}</span>
          <span>Longitude : {weather.coord?.lon ?? ""}</span>

          <p>Température : {weather.main?.temp ?? ""}</p>

          <p>{weather.weather?.[0]?.main ?? ""}</p>
          <p>{weather.weather?.[0]?.description ?? ""}</p>

        </div>
        
      </div>

    </div>
  )
}

export default App
