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
  const refCarP = useRef<HTMLDivElement>(null);
  const refPuntos = useRef<HTMLDivElement>(null);
  const refPromo = useRef<HTMLDivElement>(null);
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
      const primerElemento: Node = refCarP.current.children[0];
      refCarP.current.style.transition = `5000ms ease-out all`;
      refCarP.current.style.transform = `translateX(-${refCarP.current.offsetWidth}px)`;
      const transicion = () => {
        if (refCarP.current == null) {
          return;
        }
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

    const puntos:HTMLCollection = refPuntos.current.children;
    const iPunto = puntos as HTMLCollectionOf<HTMLElement>

    if (refPuntos.current.children.length > 0) {
      for (let i = 0; i < refPuntos.current.children.length; i++) {
          iPunto[i].style.animation = `cambiarColorPuntos 5s linear ${5*i}s`;
          setTimeout(() => {
            iPunto[i].style.animation = `none`;
          }, 5000 + i * 5000 );
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
    setTamañoPromo(refPromo.current != null? refPromo.current.offsetHeight:0);
    setTamañoPuntos(refPuntos.current != null? refPuntos.current.offsetHeight:0);
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
        <button
          className="bannerInicial__promo__btn"
          onClick={enviarPagDeBusqueda}
        >
          Ver más
        </button>
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
