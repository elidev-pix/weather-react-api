import { useEffect, useState } from 'react'
import { getCityLocalTime } from '../utils/weatherTheme'

function LocationInfo({ weather }) {
  const name = weather?.name ?? '—'
  const country = weather?.sys?.country ?? ''
  const lat = weather?.coord?.lat
  const lon = weather?.coord?.lon
  const timezone = weather?.timezone

  const [localTime, setLocalTime] = useState(() => getCityLocalTime(timezone))

  // Recalcule au changement de ville, puis chaque minute pour rester "live"
  useEffect(() => {
    setLocalTime(getCityLocalTime(timezone))
    const interval = setInterval(() => setLocalTime(getCityLocalTime(timezone)), 60000)
    return () => clearInterval(interval)
  }, [timezone])

  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div className="flex items-center gap-2 text-white text-xl font-semibold">
        <span>📍</span>
        <span>{name}</span>
        {country && <span className="text-white/70 font-normal">, {country}</span>}
      </div>

      {timezone !== undefined && (
        <span className="text-sm text-white/80">🕐 {localTime} (heure locale)</span>
      )}

      <span className="text-xs text-white/50">
        Lat {lat !== undefined ? lat.toFixed(2) : '--'} · Lon {lon !== undefined ? lon.toFixed(2) : '--'}
      </span>
    </div>
  )
}

export default LocationInfo
