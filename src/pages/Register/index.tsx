import React from 'react';
import CardRegister from '@/components/custom/Register/CardRegister';
import { Header } from '@/components/custom/Header';
const Register: React.FC = () => {
    return (
       <div>
        <Header />
            <div className='mt-1'>
            <CardRegister />
        </div>
       </div>
    );
};

export default Register;