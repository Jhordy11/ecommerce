import { useContext, useState } from "react";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import BarraDeBusqueda from "../pure/BarraDeBusqueda";
import { useNavigate } from "react-router-dom";
import "/public/PagLogin.css";
export default function PagLogin() {
  const [userName, setUserName] = useState<string>("");
  const [paswword, setPaswword] = useState<string>("");
  const { setUser } = useContext(EcommerceContexto);
  const patt: string = "(?!.*?[<>``]).{5,}$";
  const nav = useNavigate();

  function enviarAlInicio() {
    nav(`/`);
  }

  function limpiarInputs(){
  setUserName("");
  setPaswword("");
  }

  function iniciarSesion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${userName}`,
        password: `${paswword}`,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        limpiarInputs(),setUser({ token: json.token }),enviarAlInicio();
      })
      .catch((err) => {setUser({ token: null }),limpiarInputs()});
  }

  return (
    <>
      <BarraDeBusqueda mostrar={false} />
      <form
        className="pagLogin"
        onSubmit={(e) => {
          iniciarSesion(e);
        }}
      >
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          className="pagLogin__name"
          required
          placeholder="Name"
          pattern={patt}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          className="pagLogin__password"
          required
          placeholder="Password"
          pattern={patt}
          value={paswword}
          onChange={(e) => setPaswword(e.target.value)}
        />
        <input type="submit" value="Entrar" className="pagLogin__entrar" />
      </form>
    </>
  );
}
