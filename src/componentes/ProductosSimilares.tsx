import { CardProductos } from "./CardProductos";
import { EcommerceContexto } from "../contexto/EcommerceContexto";
import "/public/ProductosSimilares.css";
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
    id?: number
}
  
export default function ProductosCategoria({ category, id}: Props) {
    const { productos} = useContext(EcommerceContexto);
    return <div className="productosSimilares">
      {productos.filter((producto:datosCard)=> category==producto.category && id!=producto.id ? producto : null).map((datosCard:datosCard, index:number)=><CardProductos datosCard={datosCard} key={index}/>)}
    </div>;
  }