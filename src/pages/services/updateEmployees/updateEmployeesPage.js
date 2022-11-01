import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./updateEmployeesPage.css";
import axios from "axios";

const UpdateEmployeesPage = (props) => {
  const [employee, setEmployee] = useState([]);
  const id = parseInt(props.id);

  const fetchInfo = () => {
    fetch(`http://localhost:8089/api/v1/empleados/list/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); //testing
        setEmployee(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data, event) => {
    console.log(data);
    axios
      .post("http://localhost:8089/api/v1/empleados/update", data)
      .then((response) => {
        console.log(response.data);
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
fetchInfo();
  return (
    <div>
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nombre</label>
          <input {...register("nombre")} defaultValue={employee.nombre} />
          <label>Apellido</label>
          <input {...register("apellido")} defaultValue={employee.apellido} />
          <label>Correo electrónico</label>
          <input
            {...register("correo")}
            type="email"
            defaultValue={employee.correo}
          />
          <label>Cargo:</label>
          <select {...register("cargo")} defaultValue={employee.cargo}>
            <option value="profesor">Profesor</option>
            <option value="directivo">Directivo</option>
            <option value="monitor">Monitor</option>
            <option value="auxiliar">Auxiliar</option>
            <option value="servicios">Servicios</option>
          </select>
          <br></br>
          <label>Salario</label>
          <input
            {...register("salario")}
            type="number"
            defaultValue={employee.salario}
          />
          <label>Dirección</label>
          <input {...register("direccion")} defaultValue={employee.direccion} />
          <label>Oficina</label>
          <input {...register("oficina")} defaultValue={employee.oficina} />
          <label>Dependencia:</label>
          <select
            {...register("dependencia")}
            defaultValue={employee.dependencia}
          >
            <option value="decanatura">Decanatura</option>
            <option value="tercero">Tercero</option>
            <option value="consejo">Consejo</option>
            <option value="vicedecanatura">Vicedecanatura</option>
            <option value="administrativa">Administrativa</option>
          </select>
          <br></br>
          <label>Fecha de ingreso</label>
          <input
            {...register("fechaIngreso")}
            type="Date"
            defaultValue={employee.fechaIngreso}
          />
          <input type="submit" />
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default UpdateEmployeesPage;
