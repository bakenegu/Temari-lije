import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import StudentSelection from './pages/StudentSelection';
import ContentPage from './pages/ContentPage';
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

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/students/:grade" element={<StudentSelection />} />
            <Route path="/content/:grade/:subject" element={<ContentPage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
