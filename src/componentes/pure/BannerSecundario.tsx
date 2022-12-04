import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import "/public/BannerSecundario.css";
export default function BannerSecundario() {
  const [pImagen, setPImagen] = useState<string[]>([]);
  const { categorias, intervaloCarshow } = useContext(EcommerceContexto);
  const refCar = useRef<HTMLDivElement>(null);
  const nav = useNavigate();
  function enviarPagDeBusqueda() {
    nav(`/buscar/all`);
  }

  async function tomarImgCategorias() {
    let iman: string[] = [];
    for (let i = 0; i < categorias.length; i++) {
      await fetch(`https://fakestoreapi.com/products/category/${categorias[i]}`)
        .then((data) => data.json())
        .then((cate) => {
          iman.push(cate[0].image);
        });
    }
    setPImagen(iman);
  }

  function avanzar() {
    if (refCar.current == null) {
      return;
    }
    if (refCar.current.children.length > 0) {
      const primerElemento: Node = refCar.current.children[0];
      refCar.current.style.transition = `3000ms ease-out all`;
      refCar.current.style.transform = `translateX(-${refCar.current.offsetWidth}px)`;
      const transicion = () => {
        if (refCar.current == null) {
          return;
        }
        refCar.current.style.transition = "none";
        refCar.current.style.transform = `translateX(0)`;
        refCar.current.appendChild(primerElemento);
        refCar.current.removeEventListener("transitionend", transicion);
      };
      refCar.current.addEventListener("transitionend", transicion);
    }
  }

  function reanudarInterval() {
    intervaloCarshow.current = setInterval(() => {
      avanzar();
    }, 3000);
  }
  useEffect(() => {
    reanudarInterval();
  }, []);

  useEffect(() => {
    tomarImgCategorias();
  }, [categorias]);

  return (
    <div className="container_bannerSecundario">
      <div className="bannerSecundario">
        <div className="bannerSecundario__carrusel">
          <section className="bannerSecundario__carrusel__imgs" ref={refCar}>
            {pImagen.map((imgUrl, index) => {
              return (
                <img
                  className="bannerSecundario_carrusel__imgs__img"
                  src={imgUrl}
                  alt={categorias[index]}
                  key={index + 300}
                />
              );
            })}
          </section>
        </div>

        <section className="bannerSecundario__promo">
          <h1>Febrero</h1>
          <h1>Promocional</h1>
          <h2>Hasta un 33% en descuentos</h2>
          <button className="bannerSecundario__promo__btn" onClick={enviarPagDeBusqueda}>
            Ver Promociones
          </button>
        </section>
      </div>
    </div>
  );
}
