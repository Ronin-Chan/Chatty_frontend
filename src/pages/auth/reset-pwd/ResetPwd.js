import backGroundImg from '@assets/images/background.jpg';
import Input from '@components/input/Input';
import Button from '@components/button/Button';
import { Link, useSearchParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '@pages/auth/reset-pwd/ResetPwd.scss';
import { authService } from '@services/api/auth/auth.service';
import { useState } from 'react';

const ResetPwd = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [searchParams] = useSearchParams();

  const ResetPwd = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const body = { password, confirmPassword };
      const response = await authService.resetPassword(
        searchParams.get('token'),
        body,
      );
      setLoading(false);
      setPassword('');
      setConfirmPassword('');
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
      style={{ backgroundImage: `url(${backGroundImg})` }}
    >
      <div className="container-wrapper-auth">
        <div
          className="tabs reset-password-tabs"
          style={{ height: `${responseMessage ? '400px' : ''}` }}
        >
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login reset-password">Reset Password</div>
              </li>
            </ul>
            <div className="tab-item">
              <div className="auth-inner">
                {responseMessage && (
                  <div className={`alerts ${alertType}`} role="alert">
                    {responseMessage}
                  </div>
                )}
                <form className="reset-password-form" onSubmit={ResetPwd}>
                  <div className="form-input-container">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      labelText="New Password"
                      placeholder="New Password"
                      style={{
                        border: `${showAlert ? '1px solid #fa9b8a' : ''}`,
                      }}
                      handleChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <Input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      value={confirmPassword}
                      labelText="Confirm Password"
                      placeholder="Confirm Password"
                      handleChange={(event) => {
                        setConfirmPassword(event.target.value);
                      }}
                    />
                  </div>
                  <Button
                    label={`${
                      loading
                        ? 'RESET PASSWORD IN PROGRESS...'
                        : 'RESET PASSWORD'
                    }`}
                    className="auth-button button"
                    disabled={!password || !confirmPassword}
                  />

                  <Link to={'/'}>
                    <span className="login">
                      <FaArrowLeft className="arrow-left" /> Back to Login
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

export default ResetPwd;
