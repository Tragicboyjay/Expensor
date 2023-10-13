import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Foot from "./components/Foot"


function App() {
  return (
  <div className="App">
    <Navbar />
    <div className="content">
      <Home />
    </div>
    <Foot />
  </div>
)
}

export default App
