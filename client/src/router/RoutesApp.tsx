import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Top from '@/contents/Top'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
    </Routes>
  )
}

export default App
