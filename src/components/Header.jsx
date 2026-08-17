function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="flex items-center justify-between gap-3 px-1">
      <div className="flex flex-col">
        <a
          href="https://github.com/elidev-pix"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-baseline gap-2 group"
        >
        </a>
        
      </div>

      
      <div className="mt-2 text-xs text-white/40">
        <span>React.Js</span>
        <span className="mx-1">•</span>
        <span>Tailwind CSS</span>
        <span className="mx-1">•</span>
        <span>OpenWeather API</span>
        <span className="mx-1">•</span>
        <span>Claude Code pour le design final</span>
        <span className="mx-1">•</span>
        <span>Vercel pour le déploiement</span>
      </div>

      <button
        type="button"
        onClick={onToggleDarkMode}
        aria-label="Basculer le mode sombre"
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-lg hover:bg-white/20 transition-colors shrink-0"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  )
}

export default Header
