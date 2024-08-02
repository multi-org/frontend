import { Link } from 'react-router-dom';

export function Header() {
	return (
    <div className="flex px-64 justify-between items-center h-20">
      {/* <img src="" alt="" /> */}
      <p>LOGO</p>
      <div className="flex gap-5 items-center">
        <Link to={'/'} className="bg-yellowNormal transition duration-500 px-6 py-2 rounded-md text-gray-100 font-inter font-semibold hover:bg-yellowDark">
          Comece agora
        </Link>
        <Link to={'/'}>
          Início
        </Link>
        <Link to={'/'}>
          Quem somos?
        </Link>
        <Link to={'/'}>
          Funcionalidades 
        </Link>
        <Link to={'/'}>
          Perguntas
        </Link>
      </div>
    </div>
	)
}