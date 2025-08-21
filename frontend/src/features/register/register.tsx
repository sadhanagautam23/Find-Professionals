import { useState } from 'react';
import './register.css';
import { registerApi } from '../../shared/config/api';
import { type AxiosResponse, type AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

interface RegisterFormInputs {
  username: string;
  password: string;
  email: string;
}

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({
    mode: 'onChange', // validate on change
    
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    if (loading) return;
    setLoading(true);

    try {
      const res: AxiosResponse = await registerApi(data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));
      navigate('/');
    } catch (error) {
      console.error(error as AxiosError);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <h1>Create an account</h1>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="error-text">{errors.username.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
            })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                message:
                  'Min 8 chars, include uppercase, lowercase, number, and special char',
              },
            })}
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <button type="submit" >
          {loading ? 'Registering...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
