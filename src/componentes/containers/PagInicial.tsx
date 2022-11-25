import BannerInicial from "../pure/BannerInicial";
import BannerSecundario from "../pure/BannerSecundario";
import ProductosCategoria from "../pure/ProductosCategoria";
import { EcommerceContexto } from "../../contexto/EcommerceContexto";
import "/public/PaginaInicial.css";
import { useContext } from "react";
import BarraDeBusqueda from "../pure/BarraDeBusqueda";
export default function PagInicial() {
const { categorias} = useContext(EcommerceContexto);
  return (<>
  <BarraDeBusqueda mostrar={true} />
    <section className="paginaInicial">
      <BannerInicial />
      <section className="paginaInicial__productos">
      {categorias.map((category:string) =><section className="paginaInicial__productos__producto" key={category}><h2 className="paginaInicial__productos__producto__titulo">{category.toUpperCase()}</h2> <ProductosCategoria category={category}/></section>).reverse()}
      </section>
      <BannerSecundario />
    </section>
    </>
  );
}
