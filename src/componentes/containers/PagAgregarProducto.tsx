import { useContext, useState } from "react";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import BarraDeBusqueda from "../pure/BarraDeBusqueda";
import "/public/PagAgregarProducto.css";
export default function PagAgregarProducto() {
  const [url, setUrl] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [namePro, setNamePro] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const patt: string = "(?!.*?[<>``]).{5,}$";
  const pattPrecio: string = "^[0-9]+([,.][0-9]+)?$";
  return (
    <>
      <BarraDeBusqueda mostrar={false} />
      <form className="pagAgregarProducto">
        <h2>Agregar nuevo producto</h2>
        <label htmlFor="pagAgregarProducto__label">
          &#32;URL de la imagen
          <input
            type="url"
            className="pagAgregarProducto__url"
            required
            pattern={"https://.*"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>

        <label htmlFor="pagAgregarProducto__label">
          Categoría
          <input
            type="text"
            className="pagAgregarProducto__categoria"
            required
            pattern={patt}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </label>
        <label htmlFor="pagAgregarProducto__label">
          Nombre del producto
          <input
            type="text"
            className="pagAgregarProducto__name"
            required
            pattern={patt}
            value={namePro}
            onChange={(e) => setNamePro(e.target.value)}
          />
        </label>
        <label htmlFor="pagAgregarProducto__label">
          Precio del producto
          <input
            type="text"
            className="pagAgregarProducto__precio"
            required
            pattern={pattPrecio}
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </label>
        <label htmlFor="pagAgregarProducto__label">
          Descripción del producto
          <textarea
            className="pagAgregarProducto__descripcion"
            required
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </label>

        <input
          type="submit"
          value="Agregar Producto"
          className="pagAgregarProducto__agregar"
        />
      </form>
    </>
  );
}
