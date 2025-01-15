import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.sass';

const LoginPage = props => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.loginFormContainer}>
          <LoginForm navigate={navigate} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
