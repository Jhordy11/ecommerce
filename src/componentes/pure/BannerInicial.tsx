import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import "/public/BannerInicial.css";
export default function BannerInicial() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [tamañoPromo, setTamañoPromo] = useState(0);
  const [tamañoPuntos, setTamañoPuntos] = useState(0);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const { intervaloCarPshow, intervaloPuntosshow } =
    useContext(EcommerceContexto);
  const refCarP = useRef<any>(null);
  const refPuntos = useRef<any>(null);
  const refPromo = useRef<any>(null);
  const nav = useNavigate();
  function enviarPagDeBusqueda() {
    nav(`/buscar/all`);
  }
  function determinarTamañoDeImagen() {
    setImagenes([
      `https://api.lorem.space/image/shoes?w=${innerWidth}&h=${hallarAltoDeImagen()}`,
      `https://api.lorem.space/image/fashion?w=${innerWidth}&h=${hallarAltoDeImagen()}`,
      `https://api.lorem.space/image/watch?w=${innerWidth}&h=${hallarAltoDeImagen()}`,
    ]);
  }

  function hallarAltoDeImagen() {
    if (innerWidth <= 425) {
      return 275;
    }
    if (innerWidth <= 768) {
      return 400;
    }
    if (innerWidth <= 1024) {
      return 500;
    }
    return 700;
  }

  function avanzar() {
    if (refCarP.current == null) {
      return;
    }
    if (refCarP.current.children.length > 0) {
      const primerElemento = refCarP.current.firstChild;
      refCarP.current.style.transition = `5000ms ease-out all`;
      refCarP.current.style.transform = `translateX(-${refCarP.current.offsetWidth}px)`;
      const transicion = () => {
        refCarP.current.style.transition = "none";
        refCarP.current.style.transform = `translateX(0)`;
        refCarP.current.appendChild(primerElemento);
        refCarP.current.removeEventListener("transitionend", transicion);
      };
      refCarP.current.addEventListener("transitionend", transicion);
    }
  }

  function generarAnimacionPuntos() {
    if (refPuntos.current == null) {
      return;
    }
    if (refPuntos.current.children.length > 0) {
      for (let i = 0; i < refPuntos.current.children.length; i++) {
        if (i == 0) {
          refPuntos.current.children[
            i
          ].style.animation = `cambiarColorPuntos 5s linear`;
          setTimeout(() => {
            refPuntos.current.children[i].style.animation = `none`;
          }, 5000);
        }
        if (i == 1) {
          refPuntos.current.children[
            i
          ].style.animation = `cambiarColorPuntos 5s linear 5s`;
          setTimeout(() => {
            refPuntos.current.children[i].style.animation = `none`;
          }, 10000);
        }
        if (i == 2) {
          refPuntos.current.children[
            i
          ].style.animation = `cambiarColorPuntos 5s linear 10s`;
          setTimeout(() => {
            refPuntos.current.children[i].style.animation = `none`;
          }, 15000);
        }
      }
    }
  }

  function reanudarInterval() {
    intervaloCarPshow.current = setInterval(() => {
      avanzar();
    }, 5030);
  }
  function reanudarIntervalPuntos() {
    generarAnimacionPuntos();
    intervaloPuntosshow.current = setInterval(() => {
      generarAnimacionPuntos();
    }, 15030);
  }

  function determinarTamaños() {
    setTamañoPromo(refPromo.current.offsetHeight);
    setTamañoPuntos(refPuntos.current.offsetHeight);
  }

  useEffect(() => {
    reanudarInterval();
    reanudarIntervalPuntos();

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    determinarTamañoDeImagen();
    determinarTamaños();
  }, [innerWidth]);

  return (
    <div className="bannerInicial">
      <div className="bannerInicial__carrusel">
        <section className="bannerInicial__carrusel__partes" ref={refCarP}>
          {imagenes.map((imgUrl, index) => {
            return (
              <section
                className="bannerInicial__carrusel__partes__parte"
                key={index + 400}
              >
                <img
                  className="bannerInicial__carrusel__partes__parte__img"
                  src={imgUrl}
                  alt={`imagen ${index}`}
                />
              </section>
            );
          })}
        </section>
      </div>

      <section
        className="bannerInicial__promo"
        ref={refPromo}
        style={{ bottom: `${tamañoPromo}px` }}
      >
        <h1>Las Mejores Promociones</h1>
        <h2>Solo por hoy</h2>
        <button className="bannerInicial__promo__btn" onClick={enviarPagDeBusqueda}>Ver más</button>
      </section>
      <section
        className="bannerInicial__puntos"
        ref={refPuntos}
        style={{ bottom: `${tamañoPromo + tamañoPuntos + 10}px` }}
      >
        <div></div>
        <div></div>
        <div></div>
      </section>
    </div>
  );
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
