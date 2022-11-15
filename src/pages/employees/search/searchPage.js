import React, { useState, useEffect } from "react";
import TemplateHeader from "../../template/templateHeader";
import "./searchPage.css";
import  API_URL  from "../../../endpoint";
import TemplateFooter from "../../template/templateFooter";
import state from "../../../state";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

const SearchPage = () => {
  const [employees, setEmployees] = useState([]);

  const auth = getAuth();
  useEffect(() => {
    fetch(`${API_URL}/api/v1/matricula/listAll`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data); //testingEstudiantes
        setEmployees(data);
      })
      .catch((err) => {
        //console.log(err.message);
      });
  }, []);
  return (
    <div>
      {!auth.currentUser ? <Navigate to="/"/>: null}
      {!state.isAdmin ? <Navigate to="/"/>: null}
      <TemplateHeader />
      <h2>Lista de Estudiantes</h2>
      <table>
        <tbody>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Grado</th>
            <th>Documento</th>
            <th>Dirección</th>
            <th>EPS</th>
            <th>Fecha de Nacimiento</th>
            <th>Acudiente</th>
            <th>Doc. Acudiente</th>
            <th>Correo electrónico</th>
            <th>Teléfono</th>
            <th>Tel. Alternativo</th>
            <th>Estrato</th>
          </tr>
          {employees.map((item, index) => {
            return (
              <tr key={`row${index}`}>
                <td key={`column0item${index}`}>{item.firstName}</td>
                <td key={`column1item${index}`}>
                  {item.lastName}
                </td>
                <td key={`column2item${index}`}>
                  {item.grade}
                </td>
                <td key={`column3item${index}`}>{item.pid}</td>
                <td key={`column4item${index}`}>
                  {item.address}
                </td>
                <td key={`column5item${index}`}>
                  {item.eps}
                </td>
                <td key={`column6item${index}`}>
                  {item.birthday}
                </td>
                <td key={`column7item${index}`}>
                  {item.nameacc}
                </td>
                <td key={`column8item${index}`}>
                  {item.pidacc}
                </td>
                <td key={`column9item${index}`}>
                  {item.email}
                </td>
                <td key={`column10item${index}`}>
                  {item.telephone}
                </td>
                <td key={`column11item${index}`}>
                  {item.alttelephone}
                </td>
                <td key={`column12item${index}`}>
                  {item.estrato}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TemplateFooter />
    </div>
  );
};

export default SearchPage;
