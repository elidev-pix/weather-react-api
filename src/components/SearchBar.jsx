import { useState } from 'react'

function SearchBar({ onSearch, onUseMyPosition, isLoading }) {
  const [input, setInput] = useState('')

  const submit = () => {
    onSearch(input)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">🔍</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher une ville..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 outline-none focus:border-orange-300/60 focus:bg-white/15 transition-all"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={submit}
          disabled={isLoading}
          className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-orange-400/90 hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            'Rechercher'
          )}
        </button>

        <button
          type="button"
          onClick={onUseMyPosition}
          title="Utiliser ma position"
          className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white transition-colors"
        >
          📍
        </button>
      </div>
    </div>
  )
}

export default SearchBar
