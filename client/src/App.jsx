import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobDetail from "./routes/JobDetail";
import JobList from "./routes/JobList";
import Login from "./routes/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="jobs" element={<ProtectedRoutes />}>
          <Route index element={<JobList />} />
          <Route path=":id" element={<JobDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
