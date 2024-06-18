import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
    return (
        <main className='register'>
            <h1>Регистрация</h1>
            <RegisterForm />
        </main>
    );
};

export default RegisterPage;
