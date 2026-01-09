 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { 
  createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom'

import './index.css'
import Root from './routes/root.tsx'
import ErrorPage from './error-page.tsx'
import Contact from './routes/contact.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/contacts/:contactId',
        element: <Contact />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <RouterProvider router={router} />  
  </StrictMode>,
)
