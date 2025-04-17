import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './App'
import { RouterProvider } from 'react-router-dom'
import { register } from "swiper/element/bundle";


import AuthProvider, { AuthContext } from './contexts/AuthContext';
import './index.css'

register();
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';




createRoot(document.getElementById('root')!).render(


  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
