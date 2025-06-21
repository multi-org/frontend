import React from 'react';
import CardLogin from '@/components/custom/CardLogin/CardLogin';
import { Header } from '@/components/custom/Header'

 const Login: React.FC = () => {
 
    return (
        <div className="login-container ">
            <Header />
             <div className="mt-1">
                    <CardLogin />
            </div>
        </div>
    );
};

export default Login;