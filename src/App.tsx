import "./App.css";
import PagAgregarProducto from "./componentes/PagAgregarProducto";
import PagInicial from "./componentes/PagInicial";
import PagLogin from "./componentes/PagLogin";
import PagPorProducto from "./componentes/PagPorProducto";
import PieDePagina from "./componentes/PieDePagina";
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { EcommerceContextoProvider } from "./contexto/EcommerceContexto";
import ProtegerRuta from "./componentes/ProtegerRuta";
import PagBuscados from "./componentes/PagBuscados";
import Error404 from "./componentes/Error404";

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
