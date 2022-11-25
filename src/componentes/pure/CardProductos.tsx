import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import "/public/CardProductos.css";
import {Card} from "../../models/Card"
interface Props {
  datosCard: Card;
}

export function CardProductos({ datosCard }: Props) {
  const nav = useNavigate();
  const {detenerAnimacionCarrusel } = useContext(EcommerceContexto);
  function enviarADetallesDePorducto() {
    nav(`/producto/${datosCard.id}`);
  }
  return <div className="cardProduct" onClick={(e)=>{enviarADetallesDePorducto(),detenerAnimacionCarrusel()}}>
    <img className="cardProduct__image" src={datosCard.image} alt="imagenProduscto" />
    <h1 className="cardProduct__nombre">{datosCard.title?.split(' ',3).join(' ')}</h1>
    <h2 className="cardProduct__precio">${datosCard.price}</h2>
    <h3 className="cardProduct__id">#{datosCard.id}</h3>
  </div>;
}
