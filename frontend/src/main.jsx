import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Components/Router/router.jsx'
import NavBar from './Components/NavBar/NavBar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <NavBar />
      <h1>
        Hi Guys
      </h1>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
      <Footer />
    </>
  </StrictMode>,
)
