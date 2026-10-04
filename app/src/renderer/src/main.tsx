import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts'
import './styles/theme.css'
import { App } from './App'
import { isSignalView } from './bridge'
import { Signal } from './components/Signal'
import { installRipple } from './ripple'

const root = document.getElementById('root')
if (!root) throw new Error('#root not found')

if (isSignalView) document.documentElement.classList.add('view-signal')
else installRipple()

createRoot(root).render(<StrictMode>{isSignalView ? <Signal /> : <App />}</StrictMode>)
