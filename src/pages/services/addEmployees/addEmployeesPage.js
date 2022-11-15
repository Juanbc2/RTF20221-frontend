import React from "react";
import { useForm } from "react-hook-form";
import "./addEmployeesPage.css";
import axios from "axios";
import TemplateHeader from "../../template/templateHeader";
import API_URL from "../../../endpoint";
import TemplateFooter from "../../template/templateFooter";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import state from "../../../state";
import { useState } from "react";

const AddEmployeesPage = () => {
  const auth = getAuth();
  const resetForm = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  const { register, handleSubmit, setValue } = useForm();
  const [grade, setGrade] = useState("primero");
  const [correo, setCorreo] = useState("ieboticol@gmail.com");
  const onSubmit = async (data, event) => {
    //console.log(grade);
    await fetch(`${API_URL}/api/v1/matricula/listbycedula/${data.pid}`)
      .then((response) => response.json())
      .then((fetched) => {
        console.log(fetched); //testing
        if (fetched.status === 404 || fetched.status === 500) {
          fetch(`${API_URL}/api/v1/grado/sumGrade/${grade}`)
            .then((grados) => grados.json())
            .then((ocupacion) => {
              console.log(ocupacion); //testing
              if (ocupacion != -1) {
                axios
                  .post(`${API_URL}/api/v1/matricula/save`, data)
                  .then((response) => {
                    console.log(response.data); //testing
                    resetForm(event);
                    alert("Estudiante añadido con éxito.");
                    const json = JSON.stringify({
                      recipient: `${response.email}`,
                      msgBody: `Hola, ${response.nameacc}

                      La matrícula para el estudiante ${response.firstName} ${response.lastName}, con identificación ${response.pid} para el grado ${response.grade} ha sido realizada con éxito.
                      
                      Ante cualquier eventualidad comuníquese de nuevo con nosotros al correo  ieboticol@gmail.com o al teléfono (604) 325 5487
                      
                      Saludos coordiales.`,
                      subject: "CONFIRMACIÓN DE MATRÍCULA A I.E. BOTICOL"
                    });
                    axios.post(`${API_URL}/sendMail`, json);
                  })
                  .catch((error) => {
                    if (error.response) {
                      console.log(error.response.data);
                      alert(
                        "Error al añadir Estudiante, el servidor devuelve un error de tipo: " +
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
            });
        }
      });
  };

  const handleChange = (e) => {
    setGrade(e.target.value);
  };

  return (
    <div>
      {!auth.currentUser ? <Navigate to="/" /> : null}
      {!state.isAdmin ? <Navigate to="/" /> : null}
      <TemplateHeader />
      <h2>Añadir estudiante nuevo</h2>
      <div className="formulariox">
        <form onSubmit={handleSubmit(onSubmit)}>
          <tw>Nombre del estudiante</tw>
          <br></br>
          <input className="cajas" {...register("firstName")} />
          <br></br>
          <tw>Apellidos del estudiante</tw>
          <br></br>
          <input className="cajas" {...register("lastName")} />
          <br></br>
          <br></br>
          <tw>Grado a cursar: </tw>
          <br></br>
          <select
            className="cajas"
            {...register("grade")}
            onChange={handleChange}
          >
            <option className="textoOpciones" value="primero">
              Primero
            </option>
            <option className="textoOpciones" value="segundo">
              Segundo
            </option>
            <option className="textoOpciones" value="tercero">
              Tercero
            </option>
            <option className="textoOpciones" value="cuarto">
              Cuarto
            </option>
            <option className="textoOpciones" value="quinto">
              Quinto
            </option>
            <option className="textoOpciones" value="sexto">
              Sexto
            </option>
            <option className="textoOpciones" value="septimo">
              Septimo
            </option>
            <option className="textoOpciones" value="octavo">
              Octavo
            </option>
            <option className="textoOpciones" value="noveno">
              Noveno
            </option>
            <option className="textoOpciones" value="decimo">
              Decimo
            </option>
            <option className="textoOpciones" value="once">
              Once
            </option>
          </select>
          <br></br>
          <br></br>
          <tw>Numero de documento del estudiante</tw>
          <br></br>
          <input className="cajas" {...register("pid")} type="number" />
          <br></br>
          <tw>Dirección</tw>
          <br></br>
          <input className="cajas" {...register("address")} />
          <br></br>
          <br></br>
          <tw>EPS: </tw>
          <br></br>
          <select className="cajas" {...register("eps")}>
            <option className="textoOpciones" value="coomeva">
              Coomeva
            </option>
            <option className="textoOpciones" value="nueva eps">
              Nueva Eps
            </option>
            <option className="textoOpciones" value="sura">
              Sura
            </option>
            <option className="textoOpciones" value="salud total">
              Salud Total
            </option>
            <option className="textoOpciones" value="famisanar">
              Famisanar
            </option>
            <option className="textoOpciones" value="compensar">
              Compensar
            </option>
            <option className="textoOpciones" value="aliansalud">
              Aliansalud
            </option>
            <option className="textoOpciones" value="s.o.s">
              S.O.S.
            </option>
          </select>
          <br></br>
          <br></br>
          <tw>Fecha de nacimiento </tw>
          <input className="cajas" {...register("birthday")} type="Date" />
          <br></br>
          <br></br>
          <tw>Nombre completo del acudiente</tw>
          <br></br>
          <input className="cajas" {...register("nameacc")} />
          <br></br>
          <tw>Numero de decumento del acudiente</tw>
          <br></br>
          <input className="cajas" {...register("pidacc")} type="number" />
          <br></br>
          <tw>Correo electrónico</tw>
          <br></br>
          <input className="cajas" {...register("email")} type="email" />
          <br></br>
          <tw>Numero de telefono principal</tw>
          <br></br>
          <input className="cajas" {...register("telephone")} type="number" />
          <br></br>
          <tw>Numero de telefono alternativo</tw>
          <br></br>
          <input
            className="cajas"
            type="number"
            {...register("alttelephone")}
          />
          <br></br>
          <br></br>
          <tw>Estrato: </tw>
          <br></br>
          <select className="cajas" {...register("estrato")}>
            <option className="textoOpciones" value={1}>
              1
            </option>
            <option className="textoOpciones" value={2}>
              2
            </option>
            <option className="textoOpciones" value={3}>
              3
            </option>
            <option className="textoOpciones" value={4}>
              4
            </option>
            <option className="textoOpciones" value={5}>
              5
            </option>
            <option className="textoOpciones" value={6}>
              6
            </option>
          </select>
          <br></br>
          <br></br>
          <input
            className="botone"
            type="submit"
            name=""
            value="Enviar"
          ></input>
          <br></br>
        </form>
      </div>
      <div></div>
      <TemplateFooter />
    </div>
  );
};

export default AddEmployeesPage;
