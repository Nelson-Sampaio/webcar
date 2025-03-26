import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './App'
import AuthProvider, { AuthContext } from './contexts/AuthContext';
import './index.css'

import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(


  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
