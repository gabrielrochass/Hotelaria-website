import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CreateTest from './app/home/pages/CreateTest'
import ListTests from './app/home/pages/ListTests'

// importar rotas de src/pages
import MyAccommodations from './app/home/pages/Accommodations/myAccommodations'
import HomePage from './app/home/pages/homePage/homePage'
import LoginPage from './app/home/pages/loginPage/login'
import ActivePromosPage from './app/home/pages/promo/activePromosPage/activePromosPage'
import MyPromos from './app/home/pages/promo/myPromos/myPromos'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/active-promos' element={<ActivePromosPage />} />
        <Route path='/create-test' element={<CreateTest />} />
        <Route path='/list-tests' element={<ListTests />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/my-accommodations' element={<MyAccommodations />} />
        <Route path='/my-promos' element={<MyPromos />} />
      </Routes>
    </Router>
  )
}
