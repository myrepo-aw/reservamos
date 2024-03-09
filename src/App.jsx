/* React dependencies */
import React from 'react';
import {Route, Routes} from "react-router-dom"

/* Bootstrap dependencies */
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Styles */
import './index.scss';

/* Pages */
import Home from "./pages/Home";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
  </>
  );
}

export default App;
