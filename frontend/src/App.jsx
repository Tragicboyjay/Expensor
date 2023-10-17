import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Foot from "./components/Foot"
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useAuthContext } from './custom-hooks/useAuthContext'


function App() {
  const { user } = useAuthContext()

  return (
  <div className="App">
    <BrowserRouter>
    
      <Navbar />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" /> }
          />

          <Route
            path="/login"
            element={!user ? <Login/> : <Navigate to="/" />}
          />

          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
      <Foot />
    </BrowserRouter>
  </div>
)
}

export default App
