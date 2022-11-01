import React from "react";
import { useForm } from "react-hook-form";
import "./addEmployeesPage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import MainPage from "../../main/mainPage";

const AddEmployeesPage = () => {
  const resetForm = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data, event) => {
    console.log(data);
    axios
      .post("http://localhost:8089/api/v1/empleados/save", data)
      .then((response) => {
        console.log(response.data);
        resetForm(event);
        alert("Empleado añadido con éxito.");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(
            "Error al añadir empleado, el servidor devuelve un error de tipo: " +
              error.response.status
          );
        } else if (error.request) {
          alert("Server down.");
        } else {
          console.log(error.message);
        }
      });
  };

  return (
    <div>
      <MainPage />
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nombre</label>
          <input {...register("nombre")} />
          <label>Apellido</label>
          <input {...register("apellido")} />
          <label>Correo electrónico</label>
          <input {...register("correo")} type="email" />
          <label>Cargo:</label>
          <select {...register("cargo")}>
            <option value="profesor">Profesor</option>
            <option value="directivo">Directivo</option>
            <option value="monitor">Monitor</option>
            <option value="auxiliar">Auxiliar</option>
            <option value="servicios">Servicios</option>
          </select>
          <br></br>
          <label>Salario</label>
          <input {...register("salario")} type="number" />
          <label>Dirección</label>
          <input {...register("direccion")} />
          <label>Oficina</label>
          <input {...register("oficina")} />
          <label>Dependencia:</label>
          <select {...register("dependencia")}>
            <option value="decanatura">Decanatura</option>
            <option value="tercero">Tercero</option>
            <option value="consejo">Consejo</option>
            <option value="vicedecanatura">Vicedecanatura</option>
            <option value="administrativa">Administrativa</option>
          </select>
          <br></br>
          <label>Fecha de ingreso</label>
          <input {...register("fechaIngreso")} type="Date" />
          <input type="submit" />
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default AddEmployeesPage;
