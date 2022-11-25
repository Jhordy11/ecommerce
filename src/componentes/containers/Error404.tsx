import BarraDeBusqueda from "../pure/BarraDeBusqueda";
import "/public/Error404.css";
export default function Error404() {
    
    return <> 
      <BarraDeBusqueda mostrar={true} />
      <section className="error">
        <h1>Error 404</h1>
        <h2>Not Found</h2>
      </section>
    </>;
  }