import React from "react";
import { useForm } from "react-hook-form";
import "./addEmployeesPage.css";
import axios from "axios";
import TemplateHeader from "../../template/templateHeader";
import API_URL from "../../../endpoint";

const AddEmployeesPage = () => {
  const resetForm = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, event) => {
    console.log(data);
    let guardar = false;
    await fetch(`${API_URL}/api/v1/empleados/listbycedula/${data.cedula}`)
      .then((response) => response.json())
      .then((fetched) => {
        console.log(fetched); //testing
        if (fetched.status == 404 || fetched.status == 500) {
          axios
            .post(`${API_URL}/api/v1/empleados/save`, data)
            .then((response) => {
              console.log(response.data); //testing
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
        } else {
          alert("Cédula ya registrada en el sistema.");
        }
      })
      .catch((err) => {
        guardar = true;
        //console.log(err.message);
      });
  };

  return (
    <div>
      <TemplateHeader />
      <h2>Añadir empleado nuevo</h2>
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Cédula</label>
          <input {...register("cedula")} type="number" />
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
