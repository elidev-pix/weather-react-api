import { celsiusToFahrenheit, getWeatherTheme } from '../utils/weatherTheme'

function formatTemp(celsius, unit) {
  if (celsius === undefined || celsius === null) return '--'
  const value = unit === 'F' ? celsiusToFahrenheit(celsius) : celsius
  return Math.round(value)
}

function WeatherCard({ weather, unit, isFavorite, onToggleFavorite }) {
  const { emoji } = getWeatherTheme(weather)
  const main = weather?.main
  const description = weather?.weather?.[0]?.description ?? ''
  const conditionLabel = weather?.weather?.[0]?.main ?? ''
  const unitLabel = unit === 'F' ? '°F' : '°C'

  return (
    <div className="relative w-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10 px-6 py-8 sm:px-10 sm:py-10 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={onToggleFavorite}
        title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        className="absolute top-4 right-4 text-xl hover:scale-110 transition-transform"
      >
        {isFavorite ? '⭐' : '☆'}
      </button>

      <span className="text-7xl leading-none drop-shadow-lg">{emoji}</span>

      <div className="flex items-start gap-1">
        <span className="text-6xl sm:text-7xl font-bold text-white tracking-tight">
          {formatTemp(main?.temp, unit)}
        </span>
        <span className="text-2xl font-medium text-white/70 mt-2">{unitLabel}</span>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-white font-medium capitalize">{description || conditionLabel || '—'}</span>
        <span className="text-sm text-white/60">
          Ressenti {formatTemp(main?.feels_like, unit)}
          {unitLabel}
        </span>
      </div>

      <div className="flex gap-4 mt-2 text-sm text-white/70">
        <span>
          ↑ {formatTemp(main?.temp_max, unit)}
          {unitLabel}
        </span>
        <span>
          ↓ {formatTemp(main?.temp_min, unit)}
          {unitLabel}
        </span>
      </div>
    </div>
  )
}

export default WeatherCard
