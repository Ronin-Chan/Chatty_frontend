import '@pages/auth/register/Register.scss';
import Button from '@components/button/Button';
import Input from '@components/input/Input';
import { useEffect, useState } from 'react';
import { Utils } from '@services/utils/utils.service';
import { authService } from '@services/api/auth/auth.service';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasError, setHasError] = useState('');
  const [user, setUser] = useState('');
  const [setStoredUsername] = useLocalStorage('usernmae', 'set');
  const [setLoggedIn] = useLocalStorage('loggedIn', 'set');
  const [pageReload] = useSessionStorage('pageReload', 'set');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = async (event) => {
    setLoding(true);
    event.preventDefault();
    try {
      const avatarColor = Utils.avatarColor();
      const avatarImage = Utils.generateAvatar(username.charAt(0), avatarColor);
      const result = await authService.signUp({
        username,
        password,
        email,
        avatarColor,
        avatarImage,
      });

      setLoggedIn(true);
      setStoredUsername(username);
      Utils.dispatch(result, pageReload, dispatch, setUser);
      setHasError(false);
      setAlertType('alert-success');
    } catch (error) {
      setHasError(true);
      setAlertType('alert-error');
      setLoding(false);
      setErrorMessage(error.response.data.message);
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
      <form className="auth-form" onSubmit={registerUser}>
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
            id="email"
            name="email"
            type="text"
            value={email}
            labelText="email"
            placeholder="Enter Email"
            style={{ border: `${hasError ? '1px solid red' : ''}` }}
            handleChange={(event) => {
              setEmail(event.target.value);
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
        </div>
        <Button
          label={`${loading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'}`}
          className="auth-button button"
          disabled={!username || !email || !password}
        />
      </form>
    </div>
  );
};

Register.propTypes = {};

export default Register;
