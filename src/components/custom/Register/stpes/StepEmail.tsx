import React from 'react';
import { Input } from '@/components/ui/input';

interface StepEmaildProps {
    email: string;
    onEmailChange: (email: string) => void;
    onNext: () => void;
}

const StepEmail: React.FC<StepEmaildProps> = ({
  email,
  onEmailChange,
  onNext,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
  <form
    onSubmit={e => {
      e.preventDefault();
      onNext();
    }}
    className="flex flex-col w-full items-center gap-4"
  >
    <div className="flex flex-col w-full max-w-[360px]">
      <label>Email:</label>
      <Input
            className="h-[50px] min-w-full border border-gray-300 rounded-md p-2 focus-visible:ring-yellowDark focus-visible:ring-2 focus-visible:ring-offset-2"
        placeholder="E-mail"
        onChange={e => onEmailChange(e.target.value)}
        value={email}
        autoComplete='email'
        type="email"
        id="email"
      />
    </div>
  </form>
</div>

  );
};



export default StepEmail;