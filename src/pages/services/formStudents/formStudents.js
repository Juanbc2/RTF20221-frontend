import React from "react";
import TemplateFooter from "../../template/templateFooter";
import TemplateHeader from "../../template/templateHeader";
import "./formStudents.css";
import { getAuth } from "firebase/auth";
import { Navigate, Route } from "react-router-dom";
import API_URL from "../../../endpoint";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

const FormStudents = () => {
  const { register, handleSubmit } = useForm();
  const resetForm = (event) => {
    event.preventDefault();
    event.target.reset();
  };
  const auth = getAuth();
  const onSubmit = async (data, event) => {
    //console.log(data);
    await axios.post(`${API_URL}/sendMail`, {
      "recipient": `ieboticol@gmail.com`,
      "msgBody": ` Acudiente: ${data.nameacc}  Documento Acudiente: ${data.pidacc}  
      Estudiante: ${data.name}   Documento Estudiante: ${data.nameacc} Grado: ${data.grade}`,
      "subject": "SOLICITUD DE MATRÍCULA A I.E. BOTICOL",
    });
  };

  const handleChange =(e) => {
    setGrade(e.target.value);
  }



  const [grade,setGrade] = useState("primero");

  return (
    <div>
      <TemplateHeader />
      {auth.currentUser ? (
        <div>
          <h1>Solicitud de Matrícula</h1>
          <section className="formulario">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Nombre del acudiente</h1>
              <input
                className="controll"
                {...register("nameacc")}
                type="text"
                placeholder="Nombre Completo"
              ></input>
              <h1>Cedula del acudiente</h1>
              <input
                className="controll"
                {...register("pidacc")}
                type="number"
                minLength="8"
                maxLength="11"
              ></input>
              <h1>Nombre del menor</h1>
              <input
                className="controll"
                {...register("name")}
                type="text"
                placeholder="Nombre Completo"
              ></input>
              <h1>Documento de identidad del menor</h1>
              <input
                className="controll"
                {...register("pid")}
                type="number"
                minLength="8"
                maxLength="11"
              ></input>
              <h1>Grado a matricular</h1>
              <select className="controll" {...register("grade")} onChange={handleChange}>
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
              <input
                className="boton"
                type="submit"
                name=""
                value="Enviar"
              ></input>
            </form>
          </section>
        </div>
      ) : (
        <Navigate to="/" />
      )}
      <TemplateFooter />
    </div>
  );
};

export default FormStudents;
