import './Header.css';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <div className="container">
        <Link
          to="/"
          className="header-menu">
          Home
        </Link>

        <div className="header-float-right">
          <NavLink
            to="/addtask"
            className="header-menu">
            Cadastrar nova tarefa
        </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Header;