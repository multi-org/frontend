import React from 'react';
import CardLogin from '@/components/custom/CardLogin/CardLogin';
import { Header } from '@/components/custom/Header'

const Login: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <CardLogin />
            </div>
        </div>
    );
};

export default Login;