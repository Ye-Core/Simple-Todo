import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"


import NoteList from './components/NoteList.tsx'

import Main from './layout/Main.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Profile from './pages/Profile.tsx'
import { store } from './store.ts'
import Protect from './pages/Protect.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <NoteList />,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: (
          <Protect>
            <Profile />
          </Protect>
        )
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}>
     <RouterProvider router={router} />
   </Provider>
  </StrictMode>,
)


