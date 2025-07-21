import { Footer } from '@/components/custom/Footer'
import { Header } from '@/components/custom/Header'
import { CircleAlert } from 'lucide-react';
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />
      <div className="text-xl flex flex-col items-center justify-center h-screen">
        <div className='bg-yellowDark text-center p-8 text-grayLight rounded-md'>
          <h1 className='flex justify-center gap-2'>
            <CircleAlert />
            {(error as any).status}
          </h1>
          <span>{(error as any).statusText}</span>
          <span>{(error as any).message}</span>
          <span>{(error as any).data}</span>
        </div>
      </div>
      <Footer />
    </>
  );
}
