import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts'
import './styles/theme.css'
import { App } from './App'
import { isSignalView } from './bridge'
import { Signal } from './components/Signal'
import { installRipple } from './ripple'
import { ClawdOutfitsPrototype } from './prototype/ClawdOutfits.prototype'

const root = document.getElementById('root')
if (!root) throw new Error('#root not found')

if (isSignalView) document.documentElement.classList.add('view-signal')
else installRipple()

// PROTOTYPE (#95): never merge to main.
const prototype = location.hash === '#prototype-clawd'

createRoot(root).render(
  <StrictMode>{prototype ? <ClawdOutfitsPrototype /> : isSignalView ? <Signal /> : <App />}</StrictMode>,
)
