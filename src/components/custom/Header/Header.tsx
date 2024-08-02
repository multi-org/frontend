import { Link } from "react-router-dom";

export function Header() {
	return (
    <div className="flex px-60 justify-between items-center h-20">
      {/* <img src="" alt="" /> */}
      <p>LOGO</p>
      <div>
        <Link to={'/home'} className="bg-yellow2 px-6 py-1 rounded-md text-gray-100">
          Comece agora
        </Link>
      </div>
    </div>
	)
}