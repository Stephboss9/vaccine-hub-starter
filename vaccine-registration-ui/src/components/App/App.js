import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../Home/Home"
import Navbar from "../Navbar/Navbar"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Portal from "../Portal/Portal"
import "./App.css"
import CancelApt from "../CancelApt/CancelApt"
import UpdateApp from "../UpdateApp/UpdateApp"
import axios from "axios"
export default function App() {
  const [appState, setAppState] = useState({})

  let handleUpdateApp = () => {
      await axios.post()
  }

  let handleCancelApp = () => {
    
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={appState.user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setAppState={setAppState} />} />
          <Route path="/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/portal"
            element={<Portal setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
          <Route
            path="/updateApt"
            element={<UpdateApp setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
          <Route
            path="/cancelApt"
            element={<CancelApt setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
