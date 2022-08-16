/** @format */
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import CartPage from "./Pages/CartPage"
import DetailsPage from "./Pages/DetailsPage"
import HomePage from "./Pages/HomePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/details/:productId' element={<DetailsPage />} />
        <Route path='/cart/:userId' element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
