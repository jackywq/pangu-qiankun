import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectListPage from '../pages/ProjectListPage';
import ProjectDetailPage from '../pages/ProjectDetailPage';
import TaskManagementPage from '../pages/TaskManagementPage';
import SettingsPage from '../pages/SettingsPage';

const SubAppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectListPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/tasks" element={<TaskManagementPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default SubAppRoutes;