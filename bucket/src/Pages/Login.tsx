import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [key, setKey] = useState('');
  const [secret, setSecret] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function login(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted) {
      localStorage.setItem('data', JSON.stringify({ key, secret, name }));
      navigate('/bucket');
    }
  }, [submitted]);

  return (
    <div className="wrapper fadeInDown">
      <div className="content login">
        <h2 className="active"> Sign In </h2>

        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Access Key ID"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <input
            type="text"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="S3 Secret Key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <input
            type="text"
            id="login"
            className="fadeIn fourth"
            name="login"
            placeholder="Bucket name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="submit"
            className="fadeIn fifth"
            value="Open the Bucket"
            onClick={(e) => login(e)}
          />
        </form>
      </div>
    </div>
  );
};
