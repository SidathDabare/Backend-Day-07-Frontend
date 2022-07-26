/** @format */
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import DetailsPage from "./Pages/DetailsPage"
import HomePage from "./Pages/HomePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/details/:id' element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
