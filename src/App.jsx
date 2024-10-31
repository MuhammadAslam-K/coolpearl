import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from "./pages/home"
import Dashboard from "./pages/admin/dashboard"
import Login from "./pages/admin/login"
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
