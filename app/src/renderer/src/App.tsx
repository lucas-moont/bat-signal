import { BatEmblem } from './components/BatEmblem'
import { SessionList } from './components/SessionList'
import { useSnapshot } from './useSnapshot'
import './App.css'

export function App() {
  const { sessions, attention } = useSnapshot()
  return (
    <main className="app">
      <header className="app-header">
        <BatEmblem size={44} />
        <h1 className="app-title">BATCAVE</h1>
        {attention.length > 0 && <span className="app-badge">{attention.length}</span>}
      </header>
      <SessionList sessions={sessions} attention={attention} />
    </main>
  )
}
