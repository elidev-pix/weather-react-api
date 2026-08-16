function Chip({ city, isFavorite, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(city)}
      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1"
    >
      {isFavorite && <span>⭐</span>}
      {city}
    </button>
  )
}

function FavoritesBar({ history, favorites, onSelect }) {
  // Favoris d'abord, puis historique (sans doublons avec les favoris)
  const favLower = favorites.map((c) => c.toLowerCase())
  const historyOnly = history.filter((c) => !favLower.includes(c.toLowerCase()))

  if (favorites.length === 0 && historyOnly.length === 0) return null

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 w-full scrollbar-none">
      {favorites.map((city) => (
        <Chip key={`fav-${city}`} city={city} isFavorite onSelect={onSelect} />
      ))}
      {historyOnly.map((city) => (
        <Chip key={`hist-${city}`} city={city} isFavorite={false} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default FavoritesBar
