import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ion } from 'cesium'
import './index.css'
import App from './App.tsx'

const cesiumToken = import.meta.env.VITE_CESIUM_ION_TOKEN as string | undefined
if (cesiumToken) Ion.defaultAccessToken = cesiumToken

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
