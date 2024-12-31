import React, { useState } from "react"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Dataisertaion from "./components/Dataİnsertaion"
import HomePage from "./components/HomePage"
import DataFilter from "./components/DataFilter"
import TodoList from "./components/TodoList"


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
          Show === 2 ? <DataFilter />
            :
            Show === 3 ? <TodoList />
              :
              ""
      }

    </div>
  )
}

export default App

