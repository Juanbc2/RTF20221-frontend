import React from "react";
import notfound from "../../resources/images/404.png";
import TemplateFooter from "../template/templateFooter";
import TemplateHeader from "../template/templateHeader";

const NotFound = () => {
  return (
    <div>
      <TemplateHeader />
      <h1>¡Página no encontrada!</h1>
      <img src={notfound} alt="" />
      <TemplateFooter />
    </div>
  );
};

export default NotFound;
