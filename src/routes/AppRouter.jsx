import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AssetsList from "../pages/AssetsList";
import AssetForm from "../pages/AssetForm";
import Employees from "../pages/Employees";
import PrivateLayout from "../layout/PrivateLayout";
import ProtegerRutas from "../components/ProtegerRutas"; 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas con layout */}
        <Route
          path="/"
          element={
            <ProtegerRutas>
              <PrivateLayout />
            </ProtegerRutas>
          }
        >
          <Route index element={<Dashboard />} /> {/* / */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assets" element={<AssetsList />} />
          <Route path="assets/new" element={<AssetForm />} />
          <Route path="assets/edit/:id" element={<AssetForm />} />
          <Route path="employees" element={<Employees />} />
        </Route>

        {/* Ruta para 404 (opcional) */}
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </BrowserRouter>
  );
}
