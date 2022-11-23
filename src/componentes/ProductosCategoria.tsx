import { CardProductos } from "./CardProductos";
import { EcommerceContexto } from "../contexto/EcommerceContexto";
import "/public/ProductosCategoria.css";
import { useContext } from "react";
interface datosCard {
    id?: number,
    title?:string,
    price?:string,
    category?:string,
    description?:string,
    image?:string;  
  }
interface Props {
    category?: string,
}
  
export default function ProductosCategoria({ category}: Props) {
    const { productos} = useContext(EcommerceContexto);
    return <div className="productosCategoria">
      {productos.filter((producto:datosCard)=>category=="all"? producto : producto.category === category).map((datosCard:datosCard, index:number)=><CardProductos datosCard={datosCard} key={index}/>)}
    </div>;
  }