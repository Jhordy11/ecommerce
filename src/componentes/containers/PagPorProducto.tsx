import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import "/public/PaginaInicial.css";
import "/public/PagPorProducto.css";
import { useContext, useEffect, useRef, useState } from "react";
import ProductosSimilares from "../pure/ProductosSimilares";
import { useParams } from "react-router-dom";
import BarraDeBusqueda from "../pure/BarraDeBusqueda";
import {Card} from "../../models/Card"

export default function PagPorProducto() {
  const { productos } = useContext(EcommerceContexto);
  const { idProducto } = useParams();
  const [datosProducto, setDatosProducto] = useState<Card>();
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const refPorP = useRef<HTMLDivElement>(null);
  function tomarDatoProductos() {
    setDatosProducto(productos[Number(idProducto) - 1]);
  }
  function centrarSimilares() {
    if (refPorP.current == null) {
      return;
    }
    const seccionesPorP:HTMLCollection = refPorP.current.children;
    const iSeccionesPorP = seccionesPorP as HTMLCollectionOf<HTMLElement>

    const tamañoPag = refPorP.current.offsetWidth;
    const tamañoAP = iSeccionesPorP[1].offsetWidth;
    
    iSeccionesPorP[2].style.marginLeft = `${tamañoPag - tamañoAP - 18}px`;
  }
  useEffect(() => {
    tomarDatoProductos();
  });

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    centrarSimilares();
  }, [innerWidth]);
  return (
    <>
      <BarraDeBusqueda mostrar={true} />
      <section className="pagPorProducto" ref={refPorP}>
        <section className="pagPorProducto__producto">
          <img
            src={datosProducto?.image}
            alt={datosProducto?.title}
            className="pagPorProducto__producto__imagen"
          />
          <section className="pagPorProducto__producto__info">
            <h1 className="pagPorProducto__producto__info__titulo">
              {datosProducto?.title}{" "}
            </h1>
            <h2 className="pagPorProducto__producto__info__precio">
              ${datosProducto?.price}
            </h2>
            <p className="pagPorProducto__producto__info__descripcion">
              {datosProducto?.description}
            </p>
          </section>
        </section>

        <h2 className="pagPorProducto__similares">Productos Similares</h2>
        <ProductosSimilares
          category={datosProducto?.category}
          id={datosProducto?.id}
        />
      </section>
    </>
  );
}
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
