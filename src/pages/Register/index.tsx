import React from 'react';
import CardRegister from '@/components/custom/Register/CardRegister';
import { Header } from '@/components/custom/Header';

const Register: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className='flex-1 flex items-center justify-center'>
                <CardRegister />
            </div>
        </div>
    );
};

export default Register;