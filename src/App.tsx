import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TasksPage from './modules/TaskModule/pages/TaskPage';
import TaskDetailPage from './modules/TaskModule/pages/TaskDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} /> {}
      </Routes>
    </Router>
  );
};

export default App;