import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaChevronLeft } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f7fa;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #4299e1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    transition: transform 0.2s;
  }
  
  &:hover svg {
    transform: translateX(-3px);
  }
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

const GradeLevels = {
  elementary: {
    title: 'Elementary School',
    grades: [1, 2, 3, 4, 5, 6],
    description: 'Select your grade'
  },
  middle: {
    title: 'Middle School',
    grades: [7, 8],
    description: 'Select your grade'
  },
  high: {
    title: 'High School',
    grades: [9, 10, 11, 12],
    description: 'Select your grade'
  },
  college: {
    title: 'College',
    grades: [
      { id: 'freshman', label: 'Freshman' },
      { id: 'sophomore', label: 'Sophomore' },
      { id: 'junior', label: 'Junior' },
      { id: 'senior', label: 'Senior' }
    ],
    description: 'Select your year'
  }
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  
  // Get the current level or default to high school if not found
  const currentLevel = GradeLevels[levelId] || GradeLevels.high;
  const isCollege = levelId === 'college';

  const handleGradeSelect = (grade) => {
    if (isCollege) {
      navigate(`/students/${levelId}/${grade.id}`);
    } else {
      navigate(`/students/${levelId}/${grade}`);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <FaChevronLeft /> Back to Education Levels
      </BackButton>
      
      <Header>
        <Title>{currentLevel.title}</Title>
        <Subtitle>{currentLevel.description}</Subtitle>
      </Header>
      
      <GradeGrid>
        {currentLevel.grades.map((grade) => {
          const gradeValue = isCollege ? grade.id : grade;
          const displayLabel = isCollege ? grade.label : `Grade ${grade}`;
          const displayNumber = isCollege ? grade.label : `Grade ${grade}`;
          
          return (
            <GradeCard 
              key={gradeValue} 
              onClick={() => handleGradeSelect(gradeValue)}
              aria-label={displayLabel}
            >
              <CardImage />
              <CardContent>
                <GradeNumber>{displayNumber}</GradeNumber>
                <GradeLabel>{currentLevel.title}</GradeLabel>
              </CardContent>
            </GradeCard>
          );
        })}
      </GradeGrid>
    </Container>
  );
};

export default LandingPage;
