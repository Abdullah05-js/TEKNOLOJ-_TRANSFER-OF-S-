import React, { useState } from "react"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Dataisertaion from "./components/Dataİnsertaion"
import HomePage from "./components/HomePage"
import DataFilter from "./components/Uİ/DataFilter"


function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  const [Show, setShow] = useState(true);
  return (
    <div className="bg-black h-screen w-screen flex mx-auto">

      {Show !== true ? <NavBar setShow={setShow} /> : ""}
      {Show === true ? <Login setShow={setShow} /> : Show == 0 ?
        <HomePage />
        :
        Show === 1 ? <Dataisertaion />
          :
          Show === 2 ?  <DataFilter/> 
          :
          ""
      }

    </div>
  )
}

export default App

