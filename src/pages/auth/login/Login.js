import '@pages/auth/login/Login.scss';
import Button from '@components/button/Button';
import Input from '@components/input/Input';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from '@services/api/auth/auth.service';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import { useDispatch } from 'react-redux';
import { Utils } from '@services/utils/utils.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasError, setHasError] = useState('');
  const [user, setUser] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [setStoredLoggedIn] = useLocalStorage('loggedIn', 'set');
  const [setStoredUsername] = useLocalStorage('username', 'set');
  const [pageReload] = useSessionStorage('pageReload', 'set');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginUser = async (event) => {
    setLoding(true);
    event.preventDefault();
    try {
      const result = await authService.signIn({
        username,
        password,
      });

      setStoredUsername(username);
      setStoredLoggedIn(keepLoggedIn);
      setHasError(false);
      setAlertType('alert-success');
      Utils.dispatchUser(result, pageReload, dispatch, setUser);
    } catch (error) {
      console.log(error);
      setHasError(true);
      setAlertType('alert-error');
      setLoding(false);
      setErrorMessage(error?.response?.data.message);
    }
  };

  useEffect(() => {
    if (loading && !user) return;
    if (user) {
      navigate('/app/social/streams');
    }
  }, [loading, user, navigate]);

  return (
    <div className="auth-inner">
      {errorMessage && hasError && (
        <div className={`alerts ${alertType}`} role="alert">
          ${errorMessage}
        </div>
      )}
      <form className="auth-form" onSubmit={LoginUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeholder="Enter Username"
            style={{ border: `${hasError ? '1px solid red' : ''}` }}
            handleChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <Input
            id="password"
            name="password"
            type="text"
            value={password}
            labelText="Password"
            placeholder="Enter Password"
            style={{ border: `${hasError ? '1px solid red' : ''}` }}
            handleChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label className="checkmark-container" htmlFor="checkbox">
            <Input
              id="checkbox"
              type="checkbox"
              name="checkbox"
              value={keepLoggedIn}
              handleChange={() => {
                setKeepLoggedIn(!keepLoggedIn);
              }}
            />
            Keep me signed in
          </label>
        </div>
        <Button
          label={`${loading ? 'LOGIN IN PROGRESS...' : 'LOGIN'}`}
          className="auth-button button"
          disabled={!username || !password}
        />
        <Link to={'/forgot-password'}>
          <span className="forgot-password">
            Forgot password? <FaArrowRight className="arrow-right" />
          </span>
        </Link>
      </form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
