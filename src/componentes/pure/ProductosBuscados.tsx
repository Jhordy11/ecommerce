import { CardProductos } from "./CardProductos";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import { useContext } from "react";
import ProductosCategoria from "./ProductosCategoria";
import "/public/ProductosCategoria.css";
import {Card} from "../../models/Card"
interface Props {
    clave: string,
}
  
export default function ProductosBuscados({ clave}: Props) {
    const { productos,categorias} = useContext(EcommerceContexto);
    if (categorias.includes(clave) || clave=="all") {
      return <ProductosCategoria category={clave}/>
    }
    return <div className="productosCategoria"> 
      {productos.filter((producto:Card)=> clave.toLowerCase().split(" ").map((clav:string)=> producto.title?.toLowerCase().split(" ").includes(clav)).includes(true)  ? producto : null).map((datosCard:Card, index:number)=><CardProductos datosCard={datosCard} key={index}/>)}
    </div>;
  }