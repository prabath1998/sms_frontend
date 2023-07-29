import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
    </Routes>
  );
};

export default Router;
