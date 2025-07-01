import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Components/Router/router.jsx'
// import NavBar from './Components/NavBar/NavBar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import WebFetchContextProvider from './context/Webfetching/WebFetchContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <AuthContextProvider>
        {/*<NavBar /> */}
        <WebFetchContextProvider>

          <RouterProvider router={router} />
        </WebFetchContextProvider>
        <Footer />
      </AuthContextProvider>

    </div>
  </StrictMode>,
)
