import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    return (
        <main className='login'>
            <h1>Login</h1>
            <LoginForm />
        </main>
    );
};

export default LoginPage;
