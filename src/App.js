import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ListPage from "./components/pages/ListPage";
import DetailPage from "./components/pages/DetailPage";
import CreatePage from "./components/pages/CreatePage";
import UpdatePage from "./components/pages/UpdatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
