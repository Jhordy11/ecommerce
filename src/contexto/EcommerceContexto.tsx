import { createContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface datosCard {
  id?: number;
  title?: string;
  price?: string;
  category?: string;
  description?: string;
  image?: string;
}
interface user {
  token: string | null;
}
export const EcommerceContexto = createContext<any>(null);
export function EcommerceContextoProvider(props: any) {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [productos, setProductos] = useState<datosCard[]>([]);
  const [user, setUser] = useState<user>({ token: null });
  const intervaloCarPshow = useRef<any>(null);
  const intervaloPuntosshow = useRef<any>(null);
  const intervaloCarshow = useRef<any>(null);
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
  function enviarAlInicio() {
    nav(`/`);
  }
  function iniciarSesion(e: any) {
    e.preventDefault();
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${e.target[0].value}`,
        password: `${e.target[1].value}`,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setUser({ token: json.token }),enviarAlInicio();
      })
      .catch((err) => {setUser({ token: null })});
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
        iniciarSesion,
        user,
        intervaloCarPshow ,intervaloPuntosshow,
        intervaloCarshow,detenerAnimacionCarrusel
      }}
    >
      {props.children}
    </EcommerceContexto.Provider>
  );
}
