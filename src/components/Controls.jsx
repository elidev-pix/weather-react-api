function Controls({ unit, onToggleUnit, onRefresh, lastUpdated, isLoading }) {
  const formattedTime = lastUpdated
    ? lastUpdated.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <div className="flex items-center justify-between w-full text-white/70 text-xs">
      <span>{formattedTime ? `Mis à jour à ${formattedTime}` : ''}</span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleUnit}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white font-medium text-xs transition-colors"
        >
          °C / °F
          <span className="ml-1 text-orange-300 font-semibold">({unit})</span>
        </button>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          title="Actualiser"
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-transform disabled:opacity-50"
        >
          <span className={isLoading ? 'animate-spin inline-block' : ''}>🔄</span>
        </button>
      </div>
    </div>
  )
}

export default Controls
