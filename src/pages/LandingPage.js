import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f7fa;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #718096;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 1rem;
`;

const GradeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const LevelCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid ${props => props.isActive ? '#4299e1' : 'transparent'};
  padding: 2rem 1rem;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const LevelIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #4299e1;
`;

const LevelTitle = styled.h2`
  color: #2d3748;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
`;

const LevelDescription = styled.p`
  color: #718096;
  margin: 0;
`;

const GradeCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  cursor: pointer;
  border: 2px solid ${props => props.isActive ? '#4299e1' : '#e2e8f0'};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-color: #4299e1;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const [showGrades, setShowGrades] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const educationLevels = [
    {
      id: 'primary-school',
      title: 'Primary School',
      description: 'Grades 1-5',
      icon: '🏫',
      grades: [1, 2, 3, 4, 5].map(grade => ({
        id: `grade-${grade}`,
        name: `Grade ${grade}`,
        subjects: [
          { id: 'mathematics', name: 'Mathematics' },
          { id: 'science', name: 'Science' },
          { id: 'english', name: 'English' },
          { id: 'arts', name: 'Arts & Crafts' }
        ]
      }))
    },
    {
      id: 'middle-school',
      title: 'Middle School',
      description: 'Grades 6-8',
      icon: '🏫',
      grades: [6, 7, 8].map(grade => ({
        id: `grade-${grade}`,
        name: `Grade ${grade}`,
        subjects: [
          { id: 'mathematics', name: 'Mathematics' },
          { id: 'physics', name: 'Physics' },
          { id: 'it', name: 'Information Technology' },
          { id: 'language-arts', name: 'Language Arts' }
        ]
      }))
    },
    {
      id: 'high-school',
      title: 'High School',
      description: 'Grades 9-12',
      icon: '🎓',
      grades: [9, 10, 11, 12].map(grade => ({
        id: grade,
        name: `Grade ${grade}`,
        subjects: [
          { id: 'mathematics', name: 'Mathematics' },
          { id: 'physics', name: 'Physics' },
          { id: 'it', name: 'Information Technology' },
          { id: 'language-arts', name: 'Language Arts' }
        ]
      }))
    },
    {
      id: 'undergraduate',
      title: 'Undergraduate',
      description: 'University Level',
      icon: '🎓',
      grades: [
        { 
          id: 'year1', 
          name: 'First Year',
          subjects: [
            { id: 'mathematics', name: 'Mathematics' },
            { id: 'physics', name: 'Physics' },
            { id: 'it', name: 'Information Technology' },
            { id: 'language-arts', name: 'Language Arts' }
          ]
        },
        { 
          id: 'year2', 
          name: 'Second Year',
          subjects: [
            { id: 'mathematics', name: 'Advanced Mathematics' },
            { id: 'physics', name: 'Physics' },
            { id: 'it', name: 'Information Technology' },
            { id: 'language-arts', name: 'Language Arts' }
          ]
        },
        { 
          id: 'year3', 
          name: 'Third Year',
          subjects: [
            { id: 'mathematics', name: 'Applied Mathematics' },
            { id: 'physics', name: 'Advanced Physics' },
            { id: 'it', name: 'Information Systems' },
            { id: 'language-arts', name: 'Advanced Language Arts' }
          ]
        },
        { 
          id: 'year4', 
          name: 'Fourth Year',
          subjects: [
            { id: 'mathematics', name: 'Specialized Mathematics' },
            { id: 'physics', name: 'Physics Research' },
            { id: 'it', name: 'IT Project Management' },
            { id: 'language-arts', name: 'Professional Writing' }
          ]
        },
      ]
    },
    {
      id: 'standardized-tests',
      title: 'Standardized Tests',
      description: 'SAT & GRE Preparation',
      icon: '📝',
      isDirectLink: true,
      grades: [
        { id: 'sat', name: 'SAT', path: '/content/standardized-tests/sat' },
        { id: 'gre', name: 'GRE', path: '/content/standardized-tests/gre' }
      ]
    }
  ];

  const handleLevelSelect = (level) => {
    // For standardized tests, show the test selection
    if (level.id === 'standardized-tests') {
      setSelectedLevel(level);
      setShowGrades(true);
      return;
    }
    // For other levels, show grade selection
    setSelectedLevel(level);
    setShowGrades(true);
  };

  const handleBack = () => {
    setShowGrades(false);
    setSelectedLevel(null);
  };

  const handleGradeClick = (grade) => {
    // For standardized tests, use the path from the grade object
    if (selectedLevel?.id === 'standardized-tests') {
      navigate(grade.path);
    } else {
      // Navigate to the subject selection page for the selected grade
      navigate(`/students/${grade.id}`, { 
        state: { 
          level: selectedLevel.id,
          gradeName: grade.name,
          subjects: grade.subjects 
        } 
      });
    }
  };

  return (
    <Container>
      <Header>
        <Title>Welcome to Our Learning Platform</Title>
        <Subtitle>
          {showGrades 
            ? `Select your ${selectedLevel.title} level` 
            : 'Select your education level to get started'}
        </Subtitle>
      </Header>

      {!showGrades ? (
        <LevelGrid>
          {educationLevels.map((level) => (
            <LevelCard 
              key={level.id}
              onClick={() => handleLevelSelect(level)}
            >
              <LevelIcon>{level.icon}</LevelIcon>
              <LevelTitle>{level.title}</LevelTitle>
              <LevelDescription>{level.description}</LevelDescription>
            </LevelCard>
          ))}
        </LevelGrid>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <button 
            onClick={handleBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#4299e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem',
              fontSize: '1rem'
            }}
          >
            ← Back to Education Levels
          </button>
          
          <h2 style={{ 
            textAlign: 'center', 
            margin: '0 0 2rem 0',
            color: '#2d3748',
            fontSize: '1.8rem'
          }}>
            {selectedLevel.title} Levels
          </h2>
          
          <GradeGrid>
            {selectedLevel.grades.map((grade) => (
              <GradeCard 
                key={grade.id} 
                onClick={() => handleGradeClick(grade)}
              >
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1.8rem',
                  color: '#2d3748'
                }}>
                  {typeof grade.id === 'number' ? grade.id : 
                   grade.id === 'sat' || grade.id === 'gre' ? grade.id.toUpperCase() : 
                   grade.id.replace('year', '')}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: '#4a5568',
                  fontSize: '1.1rem'
                }}>
                  {grade.name}
                </p>
              </GradeCard>
            ))}
          </GradeGrid>
        </div>
      )}
    </Container>
  );
};

export default LandingPage;
