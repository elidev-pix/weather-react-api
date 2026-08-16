import { useCallback, useEffect, useState } from 'react'

const HISTORY_KEY = 'elidev-weather-history'
const FAVORITES_KEY = 'elidev-weather-favorites'
const MAX_HISTORY = 5

function readList(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // localStorage indisponible (mode privé, quota...) : on ignore silencieusement
  }
}

export function useFavorites() {
  const [history, setHistory] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setHistory(readList(HISTORY_KEY))
    setFavorites(readList(FAVORITES_KEY))
  }, [])

  const pushHistory = useCallback((city) => {
    if (!city) return
    setHistory((prev) => {
      const next = [city, ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase())].slice(0, MAX_HISTORY)
      writeList(HISTORY_KEY, next)
      return next
    })
  }, [])

  const toggleFavorite = useCallback((city) => {
    if (!city) return
    setFavorites((prev) => {
      const exists = prev.some((c) => c.toLowerCase() === city.toLowerCase())
      const next = exists ? prev.filter((c) => c.toLowerCase() !== city.toLowerCase()) : [...prev, city]
      writeList(FAVORITES_KEY, next)
      return next
    })
  }, [])

  const isFavorite = useCallback((city) => favorites.some((c) => c.toLowerCase() === city?.toLowerCase()), [favorites])

  return { history, favorites, pushHistory, toggleFavorite, isFavorite }
}
