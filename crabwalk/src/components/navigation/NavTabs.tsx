import { Activity, LayoutDashboard } from 'lucide-react'

export function NavTabs() {
  return (
    <div className="flex items-center gap-2">
      {/* Current page indicator */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-crab-700/50 bg-crab-500/10">
        <span className="text-crab-400"><Activity size={14} /></span>
        <span className="font-console text-xs tracking-widest text-crab-400">
          MONITOR
        </span>
      </div>

      {/* Dashboard back-link */}
      <a
        href="/"
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-shell-700/50 bg-shell-800/50 hover:bg-shell-800 hover:border-shell-600 transition-all group"
      >
        <span className="text-shell-500 group-hover:text-crab-400"><LayoutDashboard size={14} /></span>
        <span className="font-console text-xs tracking-widest text-shell-400 group-hover:text-shell-200">
          DASHBOARD
        </span>
      </a>
    </div>
  )
}
