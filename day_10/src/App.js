import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login';
import RegisterPage from './Register';
import Forgot from './Forgot';
import Hom from './Hom';
import Decorable from './Decorable';
import Cakesub from './Cakesub';
import Event from './Event';
import EcoPlan from './EcoPlan';
import UserForm from './UserForm';
import AdminPage from './Admin/AdminPage';
import Dashboard from './Admin/Dashboard';
import Users from './Admin/Users';
import Calendar from './Admin/Calendar';
import Events from './Admin/Events';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Hom />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/event" element={<ProtectedRoute element={Event} />} />
          <Route path="/decorates" element={<ProtectedRoute element={Decorable} />} />
          <Route path="/cakesec" element={<ProtectedRoute element={Cakesub} />} />
          <Route path="/eco-plan" element={<ProtectedRoute element={EcoPlan} />} />
          <Route path="/user-form" element={<ProtectedRoute element={UserForm} />} />
          <Route path="/admin" element={<ProtectedRoute element={AdminPage} />}>
          <Route index element={<ProtectedRoute element={Dashboard} />} />
          <Route path="dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="users" element={<ProtectedRoute element={Users} />} />
          <Route path="manage-products" element={<ProtectedRoute element={Events} />} />
          <Route path="calendar" element={<ProtectedRoute element={Calendar} />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
