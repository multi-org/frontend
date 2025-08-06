import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handlePageJump = (elementId: string) => {
    const element = document.getElementById(elementId)
    element?.scrollIntoView({
      behavior: 'smooth',
    })
    // Fechar menu mobile após navegar
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex h-20 items-center justify-between px-4 sm:px-8 md:px-8 lg:px-8 xl:px-8 shadow-md relative select-none">
      {/* Logo */}
      <Link to={'/'}>
        <img
          src="src/assets/header-logo.jpg"
          alt="Logo Multi"
          className="h-[55px] w-[55px]"
          draggable="false"
        />
      </Link>

      {/* Menu Desktop */}
      <div className="hidden md:flex items-center gap-5">
        <Link
          to={'/produtos'}
          className="rounded-md bg-yellowNormal px-6 py-2 font-inter font-semibold text-gray-100 transition duration-500 hover:bg-yellowDark"
        >
          Comece agora
        </Link>
        <button 
          onClick={() => handlePageJump('home')}
          className="hover:text-yellowNormal transition-colors"
        >
          Início
        </button>
        <button 
          onClick={() => handlePageJump('about-us')}
          className="hover:text-yellowNormal transition-colors"
        >
          Quem somos?
        </button>
        <button 
          onClick={() => handlePageJump('features')}
          className="hover:text-yellowNormal transition-colors"
        >
          Funcionalidades
        </button>
        <button 
          onClick={() => handlePageJump('faq')}
          className="hover:text-yellowNormal transition-colors"
        >
          Perguntas
        </button>
        <Link
          className="hover:text-yellowNormal transition-colors"
          to={'/login'}
        >
          Login
        </Link>
        
      </div>

      {/* Botão Hamburger Mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg border-t md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to={'/produtos'}
              className="rounded-md bg-yellowNormal px-6 py-3 font-inter font-semibold text-grayLight text-center transition duration-500 hover:bg-yellowDark"
              onClick={() => setIsMenuOpen(false)}
            >
              Comece agora
            </Link>
            <button 
              onClick={() => handlePageJump('home')}
              className="py-2 text-left hover:text-yellowNormal transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => handlePageJump('about-us')}
              className="py-2 text-left hover:text-yellowNormal transition-colors"
            >
              Quem somos?
            </button>
            <button 
              onClick={() => handlePageJump('features')}
              className="py-2 text-left hover:text-yellowNormal transition-colors"
            >
              Funcionalidades
            </button>
            <button 
              onClick={() => handlePageJump('faq')}
              className="py-2 text-left hover:text-yellowNormal transition-colors"
            >
              Perguntas
            </button>
            <Link
          className="hover:text-yellowNormal transition-colors"
          to={'/login'}
        >
          Login
        </Link>
          </div>
        </div>
      )}
    </div>
  )
}