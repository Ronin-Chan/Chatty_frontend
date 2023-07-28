import '../login/Login.scss';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import backGroundImg from '../../../assets/images/background.jpg';
import '../forgot-pwd/ForgotPwd.scss';

const ForgotPwd = () => {
  return (
    <div
      className="container-wrapper"
      style={{ backgroundImage: `url(${backGroundImg})` }}
    >
      <div className="environment">DEV</div>
      <div className="container-wrapper-auth">
        <div className="tabs forgot-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {/* <div className="alerts" role="alert">
              Error message
            </div> */}
                <form className="auth-form">
                  <div className="form-input-container">
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
                    label={'FORGOT PASSWORD'}
                    className="auth-button button"
                    disabled={true}
                  />
                  <Link to={'/'}>
                    <span className="forgot-password">
                      <FaArrowLeft className="arrow-left" /> Go Back
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ForgotPwd.propTypes = {};

export default ForgotPwd;
