import '../login/Login.scss';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="auth-inner">
      {/* <div className="alerts" role="alert">
        Error message
      </div> */}
      <form className="auth-form">
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value="username"
            labelText="Username"
            placeholder="Enter Username"
            handleChange={() => {}}
          />
          <Input
            id="password"
            name="password"
            type="text"
            value="pwd"
            labelText="Password"
            placeholder="Enter Password"
            handleChange={() => {}}
          />
          <label className="checkmark-container" htmlFor="checkbox">
            <input id="checkbox" type="checkbox" name="checkbox" />
            Keep me signed in
          </label>
        </div>
        <Button
          label={'LOGIN'}
          className="auth-button button"
          disabled={true}
        />
        <Link to={'/forgot-pwd'}>
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
