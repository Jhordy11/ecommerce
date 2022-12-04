import { createContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card} from "../models/Card"
import {User} from "../models/User"
interface Props{
  children: JSX.Element|JSX.Element[]
}
interface PropsEcommerceContext{
    categorias:string[],
    productos:Card[],
    user:User,
    intervaloCarPshow:  React.MutableRefObject<number>,
    intervaloPuntosshow:  React.MutableRefObject<number>,
    intervaloCarshow:  React.MutableRefObject<number>,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    detenerAnimacionCarrusel:() => void
}

export const EcommerceContexto = createContext<PropsEcommerceContext>({} as PropsEcommerceContext);

export function EcommerceContextoProvider({children}: Props) {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [productos, setProductos] = useState<Card[]>([]);
  const [user, setUser] = useState<User>({ token: null });
  const intervaloCarPshow = useRef<number>(0);
  const intervaloPuntosshow = useRef<number>(0);
  const intervaloCarshow = useRef<number>(0);
  const nav = useNavigate();
  function tomarCategorias() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((data) => data.json())
      .then((categorias) => {
        setCategorias(categorias);
      });
  }
  function tomarProductos() {
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((productos) => {
        setProductos(productos);
      });
  }
  
  function detenerAnimacionCarrusel(){
    clearInterval(intervaloCarPshow.current)
    clearInterval(intervaloPuntosshow.current)
    clearInterval(intervaloCarshow.current)
  }
  useEffect(() => {
    tomarCategorias();
    tomarProductos();
  }, []);
  useEffect(() => {});
  return (
    <EcommerceContexto.Provider
      value={{
        categorias,
        productos,
        user,
        intervaloCarPshow,
        intervaloPuntosshow,
        intervaloCarshow,
        setUser,
        detenerAnimacionCarrusel
      }}
    >
      {children}
    </EcommerceContexto.Provider>
  );
}
