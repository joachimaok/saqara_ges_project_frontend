import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { message } from 'antd';
import { IRegisterFormValues } from '../interfaces/register-form-values.interface';
import { IRegisterResponse } from '../interfaces/register-response.interface';

const useRegister = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const registerUser = async (values: IRegisterFormValues) => {
    if (values.password !== values.passwordConfirm) {
      return setError('Passwords are not the same!');
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${process.env.SERVER_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data: IRegisterResponse = await res.json();

      if (res.status === 201) {
        message.success('Registration successful');
        login(data.token, data.user);
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        message.error('Registration failed!');
      }
    } catch (error) {
      message.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
};
export default useRegister;
