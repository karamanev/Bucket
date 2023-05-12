import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Bucket, Login } from './Pages';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Toaster />
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bucket" element={<Bucket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
