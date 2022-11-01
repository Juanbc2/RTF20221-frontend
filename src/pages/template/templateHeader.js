import React from "react";
import { Link } from "react-router-dom";
import "./templateHeader.css";

const TemplateHeader = () => {
  return (
    <div>
      <div className="title">
        <h1>Gestión de Empleados</h1>
        <nav>
          <ul>
            <Link to="/">Página principal</Link>
          </ul>
          <ul>
            <Link to="/search">Lista de empleados</Link>
          </ul>
          <ul>
            <Link to="/management">Administrar empleados</Link>
          </ul>
          <ul>
            <Link to="/addEmployee">Añadir empleado</Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TemplateHeader;
