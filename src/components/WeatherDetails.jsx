import { degToCompass, formatTime } from '../utils/weatherTheme'

function DetailCard({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-3 py-4 text-center">
      <span className="text-xl">{icon}</span>
      <span className="text-white font-semibold text-sm">{value}</span>
      <span className="text-white/50 text-xs">{label}</span>
    </div>
  )
}

function WeatherDetails({ weather }) {
  const main = weather?.main
  const wind = weather?.wind
  const sys = weather?.sys
  const timezone = weather?.timezone ?? 0

  const items = [
    { icon: '💧', label: 'Humidité', value: main?.humidity !== undefined ? `${main.humidity}%` : '--' },
    { icon: '💨', label: 'Vent', value: wind?.speed !== undefined ? `${Math.round(wind.speed)} km/h` : '--' },
    { icon: '🧭', label: 'Direction', value: degToCompass(wind?.deg) },
    { icon: '🌡️', label: 'Pression', value: main?.pressure !== undefined ? `${main.pressure} hPa` : '--' },
    { icon: '🌅', label: 'Lever', value: formatTime(sys?.sunrise, timezone) },
    { icon: '🌇', label: 'Coucher', value: formatTime(sys?.sunset, timezone) },
  ]

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 w-full">
      {items.map((item) => (
        <DetailCard key={item.label} {...item} />
      ))}
    </div>
  )
}

export default WeatherDetails
