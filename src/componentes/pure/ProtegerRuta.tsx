import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";

interface Props{
    redirecionarA: string;
  }
export default function ProtegerRuta({redirecionarA}: Props){
    const {user } = useContext(EcommerceContexto);
    if(user.token == null){
        return <Navigate to={redirecionarA}/>
    }
    return <Outlet/>
}