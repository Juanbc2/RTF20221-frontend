import React from "react";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import ManagementPage from "./pages/employees/management/managementPage";
import SearchPage from "./pages/employees/search/searchPage";
import AddEmployeesPage from "./pages/services/addEmployees/addEmployeesPage";
import MainPage from "./pages/main/mainPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/addEmployee" element={<AddEmployeesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
