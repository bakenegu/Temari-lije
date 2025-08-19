import React from 'react';
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
`;

const GradeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const GradeCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: #4299e1;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 160px;
  background-image: url(${process.env.PUBLIC_URL}/tlije.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const GradeNumber = styled.h2`
  font-size: 3rem;
  color: #2b6cb0;
  margin: 0;
`;

const GradeLabel = styled.p`
  color: #4a5568;
  font-size: 1.2rem;
  margin: 0.5rem 0 0;
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const grades = [9, 10, 11, 12];

  const handleGradeSelect = (grade) => {
    navigate(`/students/${grade}`);
  };

  return (
    <Container>
      <Header>
        <Title>EduLearn Platform</Title>
        <Subtitle>Select your grade to get started</Subtitle>
      </Header>
      
      <GradeGrid>
        {grades.map((grade) => (
          <GradeCard 
            key={grade} 
            onClick={() => handleGradeSelect(grade)}
            aria-label={`Grade ${grade}`}
          >
            <CardImage />
            <CardContent>
              <GradeNumber>{grade}</GradeNumber>
              <GradeLabel>Grade {grade}</GradeLabel>
            </CardContent>
          </GradeCard>
        ))}
      </GradeGrid>
    </Container>
  );
};

export default LandingPage;
