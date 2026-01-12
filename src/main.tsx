import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { 
  createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom'

import './index.css'
import ErrorPage from '@/error-page.tsx'
import News from '@/components/news/News.tsx'
import Notice from '@/components/news/notice/Notice.tsx'
import NewsHome from '@/components/news/NewsHome.tsx'
import App from '@/App.tsx'
import NoticeView from '@/components/news/notice/NoticeView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,    
  },
  {
    path: 'news',
    element: <News />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <NewsHome />,
      },
      {
        path: '/news/notice',
        element: <Notice />,
      },
      {
        path: '/news/notice/:id',
        element: <NoticeView />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <RouterProvider router={router} />  
  </StrictMode>,
)
