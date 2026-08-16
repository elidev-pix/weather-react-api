import { STATUS } from '../hooks/useWeather'

const MESSAGES = {
  [STATUS.IDLE]: { icon: '🌍', text: 'Recherche une ville pour commencer.' },
  [STATUS.NOT_FOUND]: { icon: '🤷', text: "Ville introuvable. Vérifie l'orthographe." },
  [STATUS.API_ERROR]: { icon: '⚠️', text: "Une erreur est survenue côté serveur météo." },
  [STATUS.NETWORK_ERROR]: { icon: '📡', text: 'Problème de connexion réseau. Réessaie.' },
  [STATUS.INVALID_KEY]: { icon: '🔑', text: "Clé API manquante ou invalide (vérifie ton fichier .env)." },
  [STATUS.EMPTY_QUERY]: { icon: '✍️', text: 'Le champ de recherche est vide.' },
}

function StatusMessage({ status }) {
  if (status === STATUS.LOADING) {
    return (
      <div className="w-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-10 flex flex-col items-center gap-3 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-white/20" />
        <div className="w-24 h-8 rounded-lg bg-white/20" />
        <div className="w-40 h-4 rounded-lg bg-white/10" />
      </div>
    )
  }

  const content = MESSAGES[status]
  if (!content) return null

  return (
    <div className="w-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-10 flex flex-col items-center gap-3 text-center">
      <span className="text-4xl">{content.icon}</span>
      <p className="text-white/80 text-sm max-w-xs">{content.text}</p>
    </div>
  )
}

export default StatusMessage
