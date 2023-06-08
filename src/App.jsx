import { useState,React } from 'react'
import { Route, Routes } from 'react-router-dom'
import GetAllTodos from './pages/GetAllTodos'
import GetaSingleTodo from './pages/GetaSingleTodo'
import Layout from './pages/Layout'
import GetRandomToDo from './pages/GetRandomToDo'
import LimitAndSkip from './pages/LimitAndSkip'
import AddNewToDo from './pages/AddNewToDo'
import './assets/css/style.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"  element={<GetAllTodos/>}/>
          <Route path="/single"  element={<GetaSingleTodo/>}/>
          <Route path="/random"  element={<GetRandomToDo/>}/>
          <Route path="/limitandskip"  element={<LimitAndSkip/>}/>
          <Route path="/addnewtodo"  element={<AddNewToDo/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
