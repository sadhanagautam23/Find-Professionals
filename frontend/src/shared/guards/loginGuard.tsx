import { Navigate } from "react-router-dom";
import type{JSX} from "react";



interface LoginGuardProps{
    children: JSX.Element;
}


const LoginGuard = ({ children }: LoginGuardProps) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('currentUser');

  // Make sure they are not null, undefined, or "null"/"undefined"
  const hasValidAuth = token && token !== 'null' && token !== 'undefined'
                    && user && user !== 'null' && user !== 'undefined';

  if (hasValidAuth) {
    return <Navigate to="/home" replace />;
  }

  return children;
};


export default LoginGuard;

