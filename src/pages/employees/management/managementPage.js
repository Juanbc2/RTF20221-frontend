import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TemplateHeader from "../../template/templateHeader";
import UpdateEmployeesPage from "../../services/updateEmployees/updateEmployeesPage";
import "./managementPage.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_URL from '../../../endpoint'

const ManagementPage = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { register, handleSubmit } = useForm();
  const [id1, setId1] = useState(-1);

  useEffect(() => {}, [collapsed]);

  const onSubmit1 = (data, event) => {
    console.log(data.id1);
    if (data.id1 != id1 && data.id1 > 0) {
      setId1(data.id1);
      setCollapsed(false);
    } else {
      setCollapsed(true);
      alert("Ingrese un id válido");
    }
  };

  const onSubmit2 = (data, event) => {
    if (data.id2 > 0) {
      deleteEmployee(data.id2);
    } else {
      alert("Ingrese un id válido");
    }
  };

  const deleteEmployee = async (cedula) => {
    await fetch(`${API_URL}/api/v1/empleados/listbycedula/${cedula}`)
      .then((response) => response.json())
      .then((fetched) => {
        console.log(fetched.cedula + " " + fetched.id); //testing
        console.log("la id a eliminar es: " + fetched.id);
        axios
          .post(`${API_URL}/api/v1/empleados/delete/${fetched.id}`)
          .then((response) => {
            console.log(response);
            alert("Empleado eliminado con éxito.");
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              alert(
                "Error al eliminar empleado, el servidor devuelve un error de tipo: " +
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
        console.log(err.message);
        alert("Cédula no encontrada.");
      });
  };

  const showInfo = () => {
    return <UpdateEmployeesPage id={id1} />;
  };

  return (
    <div>
      <TemplateHeader />
      <div>
        <h2>Administrar Empleados</h2>
        <div className="forms">
          <div className="formContainer">
            <form onSubmit={handleSubmit(onSubmit1)}>
              <h2>Actualizar información del empleado</h2>
              <label>Cédula del empleado</label>
              <input {...register("id1")} type="number" />
              <button type="submit">Actualizar información del empleado</button>
            </form>
          </div>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit(onSubmit2)}>
            <h2>Eliminar información del empleado</h2>
            <label>Cédula del empleado</label>
            <input {...register("id2")} type="number" />
            <button type="submit">Eliminar empleado</button>
          </form>
        </div>
      </div>
      <div className="desplegable">{!collapsed ? showInfo() : null}</div>
    </div>
  );
};

export default ManagementPage;
