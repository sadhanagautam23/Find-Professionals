import { Navigate } from "react-router-dom";
import type{JSX} from "react";

interface AuthGuardProps{
    children: JSX.Element;
}


const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('currentUser');

  const hasValidAuth = token && token !== 'null' && token !== 'undefined'
                    && user && user !== 'null' && user !== 'undefined';

  if (!hasValidAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export default AuthGuard;

