import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import StudentSelection from './pages/StudentSelection';
import ContentPage from './pages/ContentPage';
import ResourceList from './pages/ResourceList';
import LoginPage from './pages/LoginPage';
import AdminAddResource from './pages/admin/AdminAddResource';
import ProtectedRoute from './components/ProtectedRoute';
import styled from '@emotion/styled';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 0;
  background-color: #f5f7fa;
`;

const AppContent = () => {
  const { user } = useAuth();
  
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/students/:grade" element={<StudentSelection />} />
          <Route path="/content/:grade/:subject" element={<ContentPage />} />
          <Route 
            path="/content/:grade/:subject/:resourceType" 
            element={<ResourceList />} 
          />
          <Route 
            path="/admin/add-resource/:grade/:subject/:resourceType" 
            element={
              <ProtectedRoute>
                <AdminAddResource />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
