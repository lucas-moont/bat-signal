import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts'
import './styles/theme.css'
import { App } from './App'
import { Signal } from './components/Signal'
import { installRipple } from './ripple'

const root = document.getElementById('root')
if (!root) throw new Error('#root not found')

// Both windows load this page; the query says which one this is.
const isSignal = new URLSearchParams(location.search).get('view') === 'signal'
if (isSignal) document.documentElement.classList.add('view-signal')
else installRipple()

createRoot(root).render(<StrictMode>{isSignal ? <Signal /> : <App />}</StrictMode>)
