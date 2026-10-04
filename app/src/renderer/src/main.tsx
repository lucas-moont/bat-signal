import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts'
import './styles/theme.css'
import { App } from './App'
import { installRipple } from './ripple'

const root = document.getElementById('root')
if (!root) throw new Error('#root not found')

installRipple()

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
