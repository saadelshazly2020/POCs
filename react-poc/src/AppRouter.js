import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
// import { Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import Products from './components/Products'
import RenderList from './components/render-list'
import Navbar from "./components/nav-bar";
function AppRouter() {
  return (
    <div>
      
      <Router>
      <Navbar></Navbar>
        <Routes>
          {/* Add your routes here */}

          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="RenderList" element={<RenderList />} />
        </Routes>
      </Router></div>
  );
}

export default AppRouter;