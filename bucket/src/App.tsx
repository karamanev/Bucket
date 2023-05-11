import './App.css';
import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Bucket, Login } from './Pages'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bucket" element={<Bucket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
