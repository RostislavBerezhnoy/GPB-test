import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DefaultLayout } from 'components/Layout'
import { Test1 } from 'views/Test1'
import { Test2 } from 'views/Test2'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<Navigate to='/test1' />} />
          <Route path='/test1' element={<Test1 />} />
          <Route path='/test2' element={<Test2 />} />
          <Route path='/test3' element={<Test1 />} />
        </Route>
        <Route path='*' element={<h3>Not Found</h3>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
