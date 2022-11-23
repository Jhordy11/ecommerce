import { EcommerceContexto } from "../contexto/EcommerceContexto";
import { useContext, useEffect, useState } from "react";
import BarraDeBusqueda from "./BarraDeBusqueda";
import ProductosBuscados from "./ProductosBuscados";
import { NavLink, useParams } from "react-router-dom";
import "/public/PagBuscados.css";
  
export default function PagBuscados() {
    const { categorias} = useContext(EcommerceContexto);
    const { pClave } = useParams();
    const [palabraClave, setPalabraClave] = useState("")
    function palabraBuscar() {
        if(pClave == undefined) {
            setPalabraClave("all")
            return
        }
        categorias.includes(pClave)? setPalabraClave(palabraClave): setPalabraClave(pClave)
    }
    useEffect(()=>{palabraBuscar()},[pClave])
    return (<>
    <BarraDeBusqueda mostrar={true} />
    <div className="pagBuscados">
        <ul className="pagBuscados__nav"><NavLink className="pagBuscados__navlink" to={`/buscar/${palabraClave}`}>Buscados</NavLink>{categorias.map((category:string, index:number) =>{
            let aux = category.split("")
            aux.splice(0, 1, aux[0].toUpperCase())
            return <NavLink className="pagBuscados__navlink" to={`/buscar/${category}`} key={index}>{aux.join("")}</NavLink>})}</ul>
        <ProductosBuscados clave={pClave== undefined? "all" : pClave}/>
    </div>
    
    </>);
  }