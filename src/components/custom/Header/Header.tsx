import { Link } from 'react-router-dom';

export function Header() {
  const handlePageJump = (elementId: string) => {
    const element = document.getElementById(elementId)
    element?.scrollIntoView({
      behavior: 'smooth'
    })     
  }

	return (
    <div className="flex px-64 justify-between items-center h-20 shadow-md">
      <img src="src/assets/logo multi.png" alt="logo multi" className='w-9 h-9'/>
      {/* <p>LOGO</p> */}
      <div className="flex gap-5 items-center">
        <Link to={'/'} className="bg-yellowNormal transition duration-500 px-6 py-2 rounded-md text-gray-100 font-inter font-semibold hover:bg-yellowDark">
          Comece agora
        </Link>
        <button onClick={() => handlePageJump('home')}>
          Início
        </button>
        <button onClick={() => handlePageJump('about-us')}>
          Quem somos?
        </button>
        <button onClick={() => handlePageJump('features')}>
          Funcionalidades 
        </button>
        <button onClick={() => handlePageJump('faq')}>
          Perguntas
        </button>
      </div>
    </div>
	)
}