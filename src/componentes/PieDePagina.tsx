import { useState } from "react";
import "/public/PieDePagina.css";


export default function PieDePagina() {
  const [name, setName] = useState("");
  const [mensaje, setMensaje] = useState("");
  const patt: string = "[a-zA-ZÀ-ÖØ-öø-ÿ]+.?(( |-)[a-zA-ZÀ-ÖØ-öø-ÿ]+.?)*";
  return (<>
    <footer className="pieDePagina">
      
      <section className="pieDePagina__links">
      <img className="pieDePagina__logo" src="/logo.svg" alt="logoJshop" />
        <h3>Quienes somos</h3>
        <h3>Política de privacidad</h3>
        <h3>Programa de fidelidad</h3>
        <h3>Nuestras tiendas</h3>
        <h3>Quiero ser franquiciado</h3>
        <h3>Anúncie aquí</h3>
      </section>
      <form className="pieDePagina__form">
        <h2>Hable con nosotros</h2>
        <input
          type="text"
          className="pieDePagina__form__name"
          required
          placeholder="Nombre"
          maxLength={25}
          pattern={patt}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="pieDePagina__form__mensaje"
          required
          placeholder="Mensaje"
          cols={22}
          rows={5}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <input
          type="submit"
          value="Enviar mensaje"
          className="pieDePagina__form__enviar"
        />
      </form>
      
    </footer>
    <section className="pieDePagina__copy">
    <h2>Desarrollado por Jhordy Aguas 2022</h2>
  </section></>
  );
}
