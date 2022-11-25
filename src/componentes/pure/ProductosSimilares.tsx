import { CardProductos } from "./CardProductos";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import "/public/ProductosSimilares.css";
import { useContext } from "react";
import {Card} from "../../models/Card"
interface Props {
    category?: string,
    id?: number
}
  
export default function ProductosCategoria({ category, id}: Props) {
    const { productos} = useContext(EcommerceContexto);
    return <div className="productosSimilares">
      {productos.filter((producto:Card)=> category==producto.category && id!=producto.id ? producto : null).map((datosCard:Card, index:number)=><CardProductos datosCard={datosCard} key={index}/>)}
    </div>;
  }