import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./updateEmployeesPage.css";
import axios from "axios";
import API_URL from '../../../endpoint'

const UpdateEmployeesPage = (props) => {
  const [employee, setEmployee] = useState([]);
  const id = parseInt(props.id);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/empleados/listbycedula/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); //testing
        setEmployee(data);
      })
      .catch((err) => {
        console.log(err.message);
        alert("Cédula no encontrada.");
      });
  }, [id]);

  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = async (data, event) => {
    let idAnterior = -1;
    await fetch(`${API_URL}/api/v1/empleados/listbycedula/${id}`)
      .then((response) => response.json())
      .then((fetched) => {
        idAnterior = fetched.id;
        console.log("id es: " + id);
        axios
          .post(`${API_URL}/api/v1/empleados/update/${id}`, data)
          .then((response) => {
            alert("Empleado actualizado con éxito.");
            deleteEmployee(idAnterior);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              alert(
                "Error al modificar empleado, el servidor devuelve un error de tipo: " +
                  error.response.status
              );
            } else if (error.request) {
              alert("Server down.");
            } else {
              console.log(error.message);
            }
          });
      })
      .catch((err) => {
        //console.log(err.message);
        alert("Cédula no encontrada.");
      });
  };

  const deleteEmployee = async (id) => {
    axios.post(`${API_URL}/api/v1/empleados/delete/${id}`);
  };

  return (
    <div>
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Cédula</label>
          <input
            {...register("cedula")}
            onLoad={setValue("cedula", employee.cedula)}
            required
          />
          <label>Nombre</label>
          <input
            {...register("nombre")}
            onLoad={setValue("nombre", employee.nombre)}
            required
          />
          <label>Apellido</label>
          <input
            {...register("apellido")}
            onLoad={setValue("apellido", employee.apellido)}
            required
          />
          <label>Correo electrónico</label>
          <input
            {...register("correo")}
            type="email"
            onLoad={setValue("correo", employee.correo)}
            required
          />
          <label>
            Cargo actual: <i>{employee.cargo}</i>
          </label>
          <br></br>
          <label>Nuevo cargo: </label>
          <select
            {...register("cargo")}
            onLoad={setValue("cargo", employee.cargo)}
            required
          >
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
            onLoad={setValue("salario", employee.salario)}
            required
          />
          <label>Dirección</label>
          <input
            {...register("direccion")}
            onLoad={setValue("direccion", employee.direccion)}
            required
          />
          <label>Oficina</label>
          <input
            {...register("oficina")}
            onLoad={setValue("oficina", employee.oficina)}
            required
          />
          <label>
            Dependencia actual: <i>{employee.dependencia}</i>
          </label>
          <br></br>
          <label>Nueva dependencia: </label>
          <select
            {...register("dependencia")}
            onLoad={setValue("dependencia", employee.dependencia)}
            required
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
            onLoad={setValue("fechaIngreso", employee.fechaIngreso)}
            required
          />
          <input type="submit" />
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default UpdateEmployeesPage;
