import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { message } from 'antd';
import { ILoginFormValues } from '../interfaces/login-form-values.interface copy';
import { ILoginResponse } from '../interfaces/login-response.interface';

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const loginUser = async (values: ILoginFormValues) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data: ILoginResponse = await res.json();

      if (res.status === 200) {
        message.success('Login successful');
        login(data.token, data.user);
      } else if (res.status === 404) {
        setError(data.message);
      } else {
        message.error('Wrong password!');
      }
    } catch (error) {
      message.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};
export default useLogin;
