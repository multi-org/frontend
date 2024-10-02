import { Link } from 'react-router-dom';

export function Header() {
	const handlePageJump = (elementId: string) => {
		const element = document.getElementById(elementId);
		element?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<div className="flex h-20 items-center justify-between px-64">
			<div>
				<img
					src="src/assets/header-logo.jpg"
					alt="Logo do Multi"
					className=""
				/>
			</div>
			<div className="flex items-center gap-5">
				<Link
					to={'/'}
					className="rounded-md bg-yellowNormal px-6 py-2 font-inter font-semibold text-gray-100 transition duration-500 hover:bg-yellowDark"
				>
					Comece agora
				</Link>
				<button onClick={() => handlePageJump('home')}>Início</button>
				<button onClick={() => handlePageJump('about-us')}>Quem somos?</button>
				<button onClick={() => handlePageJump('features')}>
					Funcionalidades
				</button>
				<button onClick={() => handlePageJump('faq')}>Perguntas</button>
			</div>
		</div>
	);
}
