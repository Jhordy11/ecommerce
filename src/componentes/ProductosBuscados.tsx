import { CardProductos } from "./CardProductos";
import { EcommerceContexto } from "../contexto/EcommerceContexto";
import { useContext } from "react";
import ProductosCategoria from "./ProductosCategoria";
import "/public/ProductosCategoria.css";
interface datosCard {
    id?: number,
    title?:string,
    price?:string,
    category?:string,
    description?:string,
    image?:string;  
  }
interface Props {
    clave?: any,
}
  
export default function ProductosBuscados({ clave}: Props) {
    const { productos,categorias} = useContext(EcommerceContexto);
    if (categorias.includes(clave) || clave=="all") {
      return <ProductosCategoria category={clave}/>
    }
    return <div className="productosCategoria"> 
      {productos.filter((producto:datosCard)=> clave.toLowerCase().split(" ").map((clav:string)=> producto.title?.toLowerCase().split(" ").includes(clav)).includes(true)  ? producto : null).map((datosCard:datosCard, index:number)=><CardProductos datosCard={datosCard} key={index}/>)}
    </div>;
  }