import { useEffect, useState } from 'react'
import { STATUS, useWeather } from './hooks/useWeather'
import { useFavorites } from './hooks/useFavorites'
import { getWeatherTheme } from './utils/weatherTheme'

import Header from './components/Header'
import SearchBar from './components/SearchBar'
import LocationInfo from './components/LocationInfo'
import WeatherCard from './components/WeatherCard'
import WeatherDetails from './components/WeatherDetails'
import FavoritesBar from './components/FavoritesBar'
import Controls from './components/Controls'
import StatusMessage from './components/StatusMessage'

function App() {
  const { weather, status, lastUpdated, currentCity, searchCity, useMyPosition, refresh } =
    useWeather('Ouagadougou')
  const { history, favorites, pushHistory, toggleFavorite, isFavorite } = useFavorites()

  const [unit, setUnit] = useState('C')
  const [darkMode, setDarkMode] = useState(false)

  // Ajoute la ville à l'historique dès qu'une recherche réussit
  useEffect(() => {
    if (status === STATUS.SUCCESS && weather?.name) {
      pushHistory(weather.name)
    }
  }, [status, weather, pushHistory])

  const handleSearch = (city) => searchCity(city)
  const toggleUnit = () => setUnit((u) => (u === 'C' ? 'F' : 'C'))
  const toggleDarkMode = () => setDarkMode((d) => !d)

  const isSuccess = status === STATUS.SUCCESS && weather
  const isLoading = status === STATUS.LOADING

  const theme = isSuccess ? getWeatherTheme(weather) : { gradient: 'from-blue-500 via-blue-600 to-orange-400' }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div
        className={`min-h-screen w-full bg-gradient-to-br ${theme.gradient} dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 transition-colors duration-700`}
      >
        <div className="min-h-screen w-full flex justify-center px-4 py-6 sm:py-10">
          <div className="w-full max-w-md flex flex-col gap-5">
            <div className="flex flex-col justify-center items-center">
              <span className="text-4xl font-light text-white/80">Weather App</span>
              <span className="text-lg font-semibold text-white group-hover:text-orange-300 transition-colors">
                elidev-pix
              </span>
              <span className="text-xs italic text-white/60">Real-time weather ⚡</span>
            </div>
            <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

            <SearchBar onSearch={handleSearch} onUseMyPosition={useMyPosition} isLoading={isLoading} />

            {isSuccess && <LocationInfo weather={weather} />}

            {isSuccess ? (
              <WeatherCard
                weather={weather}
                unit={unit}
                isFavorite={isFavorite(currentCity)}
                onToggleFavorite={() => toggleFavorite(currentCity)}
              />
            ) : (
              <StatusMessage status={status} />
            )}

            {isSuccess && <WeatherDetails weather={weather} />}

            {isSuccess && (
              <Controls unit={unit} onToggleUnit={toggleUnit} onRefresh={refresh} lastUpdated={lastUpdated} isLoading={isLoading} />
            )}

            <FavoritesBar history={history} favorites={favorites} onSelect={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
