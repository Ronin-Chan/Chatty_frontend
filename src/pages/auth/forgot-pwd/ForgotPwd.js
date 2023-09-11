import '@pages/auth/login/Login.scss';
import Button from '@components/button/Button';
import Input from '@components/input/Input';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import backGroundImg from '@assets/images/background.jpg';
import '@pages/auth/forgot-pwd/ForgotPwd.scss';
import { authService } from '@services/api/auth/auth.service';
import { useState } from 'react';

const ForgotPwd = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const ForgotPwd = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await authService.forgotPassword(email);
      setLoading(false);
      setEmail('');
      setShowAlert(false);
      setAlertType('alert-success');
      setResponseMessage(response?.data?.message);
    } catch (error) {
      setAlertType('alert-error');
      setLoading(false);
      setShowAlert(true);
      setResponseMessage(error?.response?.data?.message);
    }
  };

  return (
    <div
      className="container-wrapper"
      // style={{ backgroundImage: `url(${backGroundImg})` }}
    >
      <div className="environment">DEV</div>
      <div className="container-wrapper-auth">
        <div
          className="tabs forgot-password-tabs"
          style={{ height: `${responseMessage ? '300px' : ''}` }}
        >
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {responseMessage && (
                  <div className={`alerts ${alertType}`} role="alert">
                    {responseMessage}
                  </div>
                )}
                <form className="auth-form" onSubmit={ForgotPwd}>
                  <div className="form-input-container">
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      labelText="Email"
                      placeholder="Enter Email"
                      style={{
                        border: `${showAlert ? '1px solid #fa9b8a' : ''}`,
                      }}
                      handleChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    label={`${
                      loading
                        ? 'FORGOT PASSWORD IN PROGRESS...'
                        : 'FORGOT PASSWORD'
                    }`}
                    className="auth-button button"
                    disabled={!email}
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
