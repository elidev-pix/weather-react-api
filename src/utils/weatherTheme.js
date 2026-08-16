// Associe un code météo OpenWeather (ex: "01d", "10n") à un emoji et une ambiance visuelle.
// Référence codes icônes OWM : https://openweathermap.org/weather-conditions

const THEMES = {
  clear: {
    emoji: { day: '☀️', night: '🌙' },
    label: 'clear',
    gradient: {
      day: 'from-sky-400 via-blue-500 to-orange-400',
      night: 'from-slate-900 via-blue-950 to-indigo-900',
    },
  },
  clouds: {
    emoji: { day: '🌤️', night: '☁️' },
    label: 'clouds',
    gradient: {
      day: 'from-blue-300 via-slate-400 to-orange-200',
      night: 'from-slate-800 via-slate-900 to-blue-950',
    },
  },
  rain: {
    emoji: { day: '🌧️', night: '🌧️' },
    label: 'rain',
    gradient: {
      day: 'from-blue-600 via-blue-700 to-slate-600',
      night: 'from-blue-950 via-slate-900 to-black',
    },
  },
  drizzle: {
    emoji: { day: '🌦️', night: '🌦️' },
    label: 'drizzle',
    gradient: {
      day: 'from-blue-400 via-blue-500 to-slate-400',
      night: 'from-blue-950 via-slate-900 to-slate-800',
    },
  },
  thunderstorm: {
    emoji: { day: '⛈️', night: '⛈️' },
    label: 'thunderstorm',
    gradient: {
      day: 'from-slate-700 via-indigo-900 to-orange-500',
      night: 'from-slate-950 via-indigo-950 to-black',
    },
  },
  snow: {
    emoji: { day: '❄️', night: '❄️' },
    label: 'snow',
    gradient: {
      day: 'from-blue-100 via-sky-200 to-orange-100',
      night: 'from-slate-800 via-blue-900 to-slate-700',
    },
  },
  mist: {
    emoji: { day: '🌫️', night: '🌫️' },
    label: 'mist',
    gradient: {
      day: 'from-slate-300 via-blue-200 to-orange-100',
      night: 'from-slate-800 via-slate-900 to-blue-950',
    },
  },
}

const GROUP_BY_ID = (id) => {
  if (id >= 200 && id < 300) return 'thunderstorm'
  if (id >= 300 && id < 400) return 'drizzle'
  if (id >= 500 && id < 600) return 'rain'
  if (id >= 600 && id < 700) return 'snow'
  if (id >= 700 && id < 800) return 'mist'
  if (id === 800) return 'clear'
  if (id > 800) return 'clouds'
  return 'clouds'
}

/**
 * @param {object} weather - objet renvoyé par l'API OpenWeather
 * @returns {{emoji: string, gradient: string, isNight: boolean, label: string}}
 */
export function getWeatherTheme(weather) {
  const condition = weather?.weather?.[0]
  const isNight = condition?.icon?.endsWith('n') ?? false
  const group = condition ? GROUP_BY_ID(condition.id) : 'clear'
  const theme = THEMES[group] ?? THEMES.clear

  return {
    emoji: isNight ? theme.emoji.night : theme.emoji.day,
    gradient: isNight ? theme.gradient.night : theme.gradient.day,
    isNight,
    label: theme.label,
  }
}

/**
 * Convertit un timestamp unix (secondes) + décalage timezone (secondes) en heure lisible.
 */
export function formatTime(unixSeconds, timezoneOffsetSeconds = 0) {
  if (!unixSeconds) return '--:--'
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000)
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}

/**
 * Convertit une direction de vent en degrés vers un point cardinal en français.
 */
export function degToCompass(deg) {
  if (deg === undefined || deg === null) return '--'
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
  const index = Math.round(deg / 45) % 8
  return directions[index]
}

export function celsiusToFahrenheit(celsius) {
  return celsius * (9 / 5) + 32
}

/**
 * Calcule l'heure locale actuelle de la ville à partir du décalage timezone
 * renvoyé par OpenWeather (en secondes par rapport à UTC).
 */
export function getCityLocalTime(timezoneOffsetSeconds = 0) {
  const nowUtcMs = Date.now() + new Date().getTimezoneOffset() * 60000
  const cityDate = new Date(nowUtcMs + timezoneOffsetSeconds * 1000)
  return cityDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}
