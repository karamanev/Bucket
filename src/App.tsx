import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { BucketData } from './Interfaces';
import { Bucket, Login } from './Pages';

function App() {
  const [hasData, setData] = useState(false);
  const [config, setConfig] = useState<null | BucketData>(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data) {
      setData(true);
      setConfig(JSON.parse(data) as BucketData);
    }
  }, [logged]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !hasData ? (
                <Login onLogged={() => setLogged(true)} />
              ) : (
                <Navigate to="/bucket" />
              )
            }
          />

          <Route
            path="/bucket"
            element={config ? <Bucket config={config} /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
