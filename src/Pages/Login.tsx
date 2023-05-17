import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  onLogged: (logged: boolean) => void;
};

export const Login = (props: Props) => {
  const [key, setKey] = useState('');
  const [secret, setSecret] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  function login(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    localStorage.setItem(
      'data',
      JSON.stringify({
        S3_BUCKET: name,
        accessKeyId: key,
        secretAccessKey: secret
      })
    );
    props.onLogged(true);
    () => navigate('/bucket');
  }

  return (
    <div className="wrapper fadeInDown">
      <div className="content login">
        <h2 className="login"> Sign In </h2>

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
            value="Open"
            onClick={(e) => login(e)}
          />
        </form>
      </div>
    </div>
  );
};
