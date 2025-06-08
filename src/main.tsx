import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from './components/ui/sonner.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" richColors />
  </React.StrictMode>
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
