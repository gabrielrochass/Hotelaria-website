import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CreateTest from './app/home/pages/CreateTest'
import ListTests from './app/home/pages/ListTests'

// importar rotas de src/pages
import MyAccommodations from './app/home/pages/Accommodations/myAccommodations'
import HomePage from './app/home/pages/homePage/homePage'
import LoginPage from './app/home/pages/loginPage/login'
import ActivePromosPage from './app/home/pages/promo/activePromosPage/activePromosPage'
import MyPromos from './app/home/pages/promo/myPromos/myPromos'
import SignUpPage from './app/home/pages/SIgnUp/signUp.js'

import SearchPage from './app/home/pages/search/search'

import AccommodationsList from './app/home/pages/Accommodations/AccommodationsList'
import PublishAccommodation from './app/home/pages/Accommodations/PublishAccommodation'

import Detalhes from './app/home/pages/detalhes/detalhesPage'
import AddPaymentPage from './app/home/pages/payment/add/addPaymentPage'
import PaymentPage from './app/home/pages/payment/visualize/paymentPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/active-promos' element={<ActivePromosPage />} />
        <Route path='/create-test' element={<CreateTest />} />
        <Route path='/list-tests' element={<ListTests />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/my-accommodations' element={<AccommodationsList />} />
        <Route path='/my-promos' element={<MyPromos />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/my-accommodations/list' element={<AccommodationsList />} />
        <Route path='/publish' element={<PublishAccommodation />} />
        <Route path='/payment-methods' element={<PaymentPage />} />
        <Route path='/payment-methods/add' element={<AddPaymentPage />} />
        <Route path='/detalhes-da-acomodacao' element={<Detalhes />} />
      </Routes>
    </Router>
  )
}
