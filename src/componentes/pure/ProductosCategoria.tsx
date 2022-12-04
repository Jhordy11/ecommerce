import { CardProductos } from "./CardProductos";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import "/public/ProductosCategoria.css";
import { useContext } from "react";
import {Card} from "../../models/Card"
interface Props {
    category: string,
}
  
export default function ProductosCategoria({ category}: Props) {
    const { productos} = useContext(EcommerceContexto);
    return <div className="productosCategoria">
      {productos.filter((producto:Card)=>category=="all"? producto : producto.category === category).map((datosCard:Card, index:number)=><CardProductos datosCard={datosCard} key={index}/>)}
    </div>;
  }