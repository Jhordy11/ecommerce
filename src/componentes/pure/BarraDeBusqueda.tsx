import { useContext, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import "/public/BarraDeBusqueda.css";
interface Props{
  mostrar: boolean;
}
export default function BarraDeBusqueda({mostrar}:Props) {
  const [busqueda, setBusqueda] = useState("");
  const {  user, detenerAnimacionCarrusel } = useContext(EcommerceContexto);
  const nav = useNavigate();
  function botonesBarra() {
    if (user.token == null) {
      return (
        <button
          className="barraDeBusqueda__botonLog"
          style={{ display: mostrar? "block":"none" }}
          onClick={(e) => {
            enviarAlLogin(), detenerAnimacionCarrusel();
          }}
        >
          Login
        </button>
      );
    }
    return (
      <button
        className="barraDeBusqueda__botonAgre"
        style={{ display: mostrar? "block":"none"  }}
        onClick={enviarMenuAdmin}
      >
        Menú Administrador
      </button>
    );
  }

  function enviarAlLogin() {
    nav(`/login`);
  }
  function enviarAlInicio() {
    nav(`/`);
  }
  function enviarMenuAdmin() {
    nav(`/AgregarProducto`);
  }
  function enviarPagDeBusqueda(e: React.MouseEvent|React.FormEvent) {
    e.preventDefault();
    nav(`/buscar/${busqueda}`);
  }
  return (
    <div className="gbbarraDeBusqueda">
      <div className="barraDeBusqueda">
        <img
          className="barraDeBusqueda__logo"
          src="/logo.svg"
          alt="logoJshop"
          onClick={(e:React.MouseEvent) => {
            enviarAlInicio(), detenerAnimacionCarrusel();
          }}
        />
        {botonesBarra()}
          <form className="barraDeBusqueda__buscador" action="" onSubmit={(e:React.FormEvent)=>enviarPagDeBusqueda(e)}>
          <input
            className="barraDeBusqueda__buscador__input"
            type="text"
            placeholder="Buscar"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value)}
            value={busqueda}
          />
          <AiOutlineSearch className="barraDeBusqueda__buscador__lupa" onClick={(e:React.MouseEvent)=>enviarPagDeBusqueda(e)} />
          </form>
          
          
      </div>
    </div>
  );
}
