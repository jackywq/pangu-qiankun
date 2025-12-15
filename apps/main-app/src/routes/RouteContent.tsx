import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProjectManagementPage from '../pages/ProjectManagementPage';
import SubAppContainer from '../components/SubAppContainer';

const RouteContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/project" element={<ProjectManagementPage />} />
      <Route path="/react/*" element={<SubAppContainer />} />
      <Route path="/vue/*" element={<SubAppContainer />} />
    </Routes>
  );
};

export default RouteContent;

