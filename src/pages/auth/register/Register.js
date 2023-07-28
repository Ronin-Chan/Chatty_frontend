import '../login/Login.scss';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';

const Register = () => {
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
            id="email"
            name="email"
            type="text"
            value="test@test.com"
            labelText="email"
            placeholder="Enter Email"
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
        </div>
        <Button
          label={'Register'}
          className="auth-button button"
          disabled={true}
        />
      </form>
    </div>
  );
};

Register.propTypes = {};

export default Register;
