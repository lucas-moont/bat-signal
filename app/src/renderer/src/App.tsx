import { BatEmblem } from './components/BatEmblem'
import './App.css'

export function App() {
  return (
    <main className="app">
      <header className="app-header">
        <BatEmblem size={44} />
        <h1 className="app-title">BATCAVE</h1>
      </header>
    </main>
  )
}
