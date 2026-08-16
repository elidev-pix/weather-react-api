import { useCallback, useEffect, useState } from 'react'

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: import.meta.env.VITE_API_BASE,
}

// États possibles de l'application, pour éviter tout affichage "undefined"/"null"
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  NOT_FOUND: 'not_found',
  API_ERROR: 'api_error',
  NETWORK_ERROR: 'network_error',
  INVALID_KEY: 'invalid_key',
  EMPTY_QUERY: 'empty_query',
}

export function useWeather(defaultCity = 'Ouagadougou') {
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [currentCity, setCurrentCity] = useState(defaultCity)

  const runFetch = useCallback(async (url, cityLabel) => {
    if (!api.key || !api.base) {
      setStatus(STATUS.INVALID_KEY)
      return
    }
    setStatus(STATUS.LOADING)
    try {
      const response = await fetch(url)

      if (response.status === 401) {
        setStatus(STATUS.INVALID_KEY)
        return
      }
      if (response.status === 404) {
        setStatus(STATUS.NOT_FOUND)
        return
      }
      if (!response.ok) {
        setStatus(STATUS.API_ERROR)
        return
      }

      const result = await response.json()
      setWeather(result)
      setCurrentCity(cityLabel ?? result.name)
      setLastUpdated(new Date())
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      // fetch échoue (pas de réseau, CORS, etc.)
      setStatus(STATUS.NETWORK_ERROR)
    }
  }, [])

  const searchCity = useCallback(
    (city) => {
      const trimmed = city?.trim()
      if (!trimmed) {
        setStatus(STATUS.EMPTY_QUERY)
        return
      }
      const url = `${api.base}weather?q=${encodeURIComponent(trimmed)}&units=metric&APPID=${api.key}&lang=fr`
      runFetch(url, trimmed)
    },
    [runFetch],
  )

  const searchByCoords = useCallback(
    (lat, lon) => {
      const url = `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}&lang=fr`
      runFetch(url, null)
    },
    [runFetch],
  )

  const useMyPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus(STATUS.API_ERROR)
      return
    }
    setStatus(STATUS.LOADING)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        searchByCoords(position.coords.latitude, position.coords.longitude)
      },
      () => {
        setStatus(STATUS.API_ERROR)
      },
    )
  }, [searchByCoords])

  const refresh = useCallback(() => {
    if (currentCity) searchCity(currentCity)
  }, [currentCity, searchCity])

  useEffect(() => {
    searchCity(defaultCity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    weather,
    status,
    lastUpdated,
    currentCity,
    searchCity,
    useMyPosition,
    refresh,
  }
}
