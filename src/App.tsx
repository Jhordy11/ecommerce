import "./App.css";
import PagAgregarProducto from "./componentes/containers/PagAgregarProducto";
import PagInicial from "./componentes/containers/PagInicial";
import PagLogin from "./componentes/containers/PagLogin";
import PagPorProducto from "./componentes/containers/PagPorProducto";
import PieDePagina from "./componentes/pure/PieDePagina";
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { EcommerceContextoProvider } from "./contexto/EcommerceContexto";
import ProtegerRuta from "./componentes/pure/ProtegerRuta";
import PagBuscados from "./componentes/containers/PagBuscados";
import Error404 from "./componentes/containers/Error404";

function App() {
  return (
    <div className="App">
      <HashRouter>
      <EcommerceContextoProvider>
          <Routes>
            <Route index element={<PagInicial />} />
            <Route path="/login" element={<PagLogin />} />
            <Route path="/producto" element={<PagPorProducto />}>
              <Route path=":idProducto" element={<PagPorProducto />} />
            </Route>
            <Route path="/buscar" element={<PagBuscados/>}>
              <Route path=":pClave" element={<PagBuscados />} />
            </Route>
            <Route element={<ProtegerRuta redirecionarA={"/error404"}/>}>
            <Route path="/AgregarProducto" element={<PagAgregarProducto />}/>
            </Route>
            <Route path="/*" element={<Error404 />}/>
          </Routes>
          <PieDePagina />
        
      </EcommerceContextoProvider>
      </HashRouter>
    </div>
  );
}

export default App;
