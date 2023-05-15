import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  isLogged: boolean;
  children: any;
}

function GuarderRoute({ isLogged, children }: Props) {
  if (isLogged) {
    return <Navigate to="/bucket" replace />;
  }
  return children;
}
export default GuarderRoute;
