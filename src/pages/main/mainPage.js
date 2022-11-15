import React, { useEffect } from "react";
import "./mainPage.css";
import TemplateHeader from "../template/templateHeader";
import TemplateFooter from "../template/templateFooter";
import Auth from "./logeo.js";

const MainPage = () => {



  return (
    <div>
      <TemplateHeader />
      <Auth />
      <TemplateFooter />
    </div>    
  );
};

export default MainPage;
