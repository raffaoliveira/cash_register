import { createBrowserRouter } from 'react-router-dom'
import { SideBar } from './pages/SideBar'
import { CashMovement } from './pages/CashMovement'
import { CashRegister } from './pages/CashRegister'
import { About } from './pages/About'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SideBar />,
    children: [
      {
        index: true,
        element: <CashMovement />,
      },
      {
        path: 'cash',
        element: <CashRegister />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])
