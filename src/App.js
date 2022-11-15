import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import ManagementPage from "./pages/employees/management/managementPage";
import SearchPage from "./pages/employees/search/searchPage";
import AddEmployeesPage from "./pages/services/addEmployees/addEmployeesPage";
import MainPage from "./pages/main/mainPage";
import FormStudents from "./pages/services/formStudents/formStudents";
import NotFound from "./pages/main/notFound";
import Welcome from "./pages/main/welcome";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/addEmployee" element={<AddEmployeesPage />} />
          <Route path="/formstudents" element={<FormStudents />} />
          <Route path="/welcome" element={<Welcome />}/>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
