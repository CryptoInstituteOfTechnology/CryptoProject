import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Components/Router/router.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import WebFetchContextProvider from './context/Webfetching/WebFetchContext.jsx'
import { BackEndContextProvider } from './context/BackEndContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <AuthContextProvider>
        <WebFetchContextProvider>
          <BackEndContextProvider>
            <RouterProvider router={router} />
          </BackEndContextProvider>
        </WebFetchContextProvider>
      </AuthContextProvider>
    </div>
  </StrictMode>,
)
