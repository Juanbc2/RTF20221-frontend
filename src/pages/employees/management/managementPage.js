import { React, useState } from "react";
import { Link } from "react-router-dom";
import MainPage from "../../main/mainPage";
import UpdateEmployeesPage from "../../services/updateEmployees/updateEmployeesPage";
import "./managementPage.css";
import { useForm } from "react-hook-form";

const ManagementPage = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { register, handleSubmit } = useForm();
  const [id, setId] = useState(-1);

  const ShowInfo = (id) => {
    return (
      <div>
        <h1>Información del empleado:</h1>
      </div>
    );
  };

  const onSubmit = (data, event) => {
    console.log(data.id);
    if (data.id > 0) {
      setId(data.id);
      setCollapsed(false);
    } else {
      setCollapsed(true);
      alert("Ingrese un id válido");
    }
  };

  return (
    <div>
      <MainPage />
      <div>
        <h3>Acciones</h3>
        <div className="formContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Id del empleado</label>
            <input {...register("id")} defaultValue={0} type="number" />
            <div>
              <input type="submit" value="Ver información del empleado" />

              <button>Eliminar empleado</button>
              <button>Actualizar información del empleado</button>
            </div>
          </form>
        </div>
      </div>

      {!collapsed ? <UpdateEmployeesPage id={id} /> : null}
    </div>
  );
};

export default ManagementPage;
