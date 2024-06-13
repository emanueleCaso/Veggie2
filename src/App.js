// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Cuisine from './components/pages/Cuisine';
import Menu from './components/Menu/Menu';
import SearchResults from './components/pages/SearchResults'; // Importa la nuova pagina dei risultati della ricerca
import Details from './components/pages/Details';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/search/:searchValue" element={<SearchResults />} /> {/* Nuova route per i risultati della ricerca */}
        <Route path="/detail/:id" element={<Details />} /> {/* Nuova route per i dettagli delle ricette */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

