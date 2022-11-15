import React from "react";
import TemplateFooter from "../template/templateFooter";
import TemplateHeader from "../template/templateHeader";
import { Link } from "react-router-dom";
import state from "../../state";
import "./welcome.css";
import { getAuth } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";

const Welcome = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <div>
      <TemplateHeader />
      {!auth.currentUser ? <Navigate to="/" /> : null}
      {state.isAdmin ? (
        <div>
          <h1>Bienvenido ADMIN a la Institucion Educativa BotiCol</h1>
          <section
            className="admin"
            onClick={() => {
              navigate("/search");
            }}
          >
            <ul>
              <h3>Listado Completo de Estudiantes</h3>
            </ul>
          </section>
          <section
            className="matricula"
            onClick={() => {
              navigate("/addEmployee");
            }}
          >
            <ul>
              <h3>Matricular Estudiante</h3>
            </ul>
          </section>
        </div>
      ) : (
        <div>
          <h1>Bienvenido señor/a a la Institucion Educativa BotiCol</h1>
          <section
            className="usuario"
            onClick={() => {
              navigate("/formstudents");
            }}
          >
            <ul>
              <h3>Solicitud de Matricula</h3>
            </ul>
          </section>
        </div>
      )}
      <TemplateFooter />
    </div>
  );
};

export default Welcome;
