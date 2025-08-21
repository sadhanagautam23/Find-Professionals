import { useState } from 'react';
import './login.css';
import { loginApi } from '../../shared/config/api';
import { type AxiosResponse, type AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({mode : "onSubmit"});

  const onSubmit = (data: LoginFormInputs) => {
    if (loading) return;
    setLoading(true);

    loginApi(data)
      .then((res: AxiosResponse) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        if (!res.data.profileCompleted) {
          navigate('/profile-setup');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
        toast.error('Invalid username or password');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-wrapper">
      <h1>Sign in</h1>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          autoComplete="username"
          aria-invalid={!!errors.username}
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          {...register('password', {
            required: 'Password is required'
,
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit" >
          {loading ? 'Logging in...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
