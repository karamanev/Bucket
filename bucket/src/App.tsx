import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Bucket, Login } from './Pages';
import { Toaster } from 'react-hot-toast';
import GuardedRoute from './Helpers/GuardedRoute';

function App() {
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(Boolean(localStorage.getItem('data')));
  });

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Toaster />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <GuardedRoute isLogged={isLogged}>
                <Login />
              </GuardedRoute>
            }
          />

          <Route path="/bucket" element={<Bucket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
