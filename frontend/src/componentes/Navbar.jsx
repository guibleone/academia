import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import { Link } from "react-router-dom";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Exercítar o Corpo</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Sair</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Entrar</Link>
              <Link to="/signup">Cadastrar</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
