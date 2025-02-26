import React, { useState } from "react"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Dataisertaion from "./components/Dataİnsertaion"
import HomePage from "./components/HomePage"
import DataFilter from "./components/DataFilter"
import TodoList from "./components/TodoList"
import Stats from "./components/Stats"
import SignUp from "./components/Uİ/SignUp"


function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  const [Show, setShow] = useState(true);
  return (
    <div className="bg-black h-screen w-screen flex mx-auto">

      {Show !== true ? <NavBar setShow={setShow} /> : ""}
      {Show === true ? <SignUp setShow={setShow} /> : Show == 0 ?
        <HomePage />
        :
        Show === 1 ? <Dataisertaion />
          :
          Show === 2 ? <DataFilter />
            :
            Show === 3 ? <TodoList />
              :
              Show === 4 ? <Stats />
                :
                ''
      }

    </div>
  )
}

export default App

