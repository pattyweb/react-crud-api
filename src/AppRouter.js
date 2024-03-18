import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Add from './Add'
import App from './App'
import Edit from './Edit'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/create' element={<Add />} />
        <Route path='/update/:id' element={<Edit />} /> {/* Add a slash before :id */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
