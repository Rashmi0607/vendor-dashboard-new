import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Login from "./components/login.jsx";
import Vendor from "./components/vendor.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vendor" element={<Vendor />} />
      </Routes>
    </BrowserRouter>
  );
}
