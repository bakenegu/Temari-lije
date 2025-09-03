import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaBook, FaPencilAlt, FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  margin-bottom: 1.5rem;
  
  &:hover {
    background: #3182ce;
  }
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 700px;
`;

const ExamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const ExamCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ExamIcon = styled.div`
  font-size: 3rem;
  color: #4299e1;
  margin-bottom: 1rem;
`;

const ExamTitle = styled.h2`
  color: #2d3748;
  margin: 0.5rem 0;
  font-size: 1.5rem;
`;

const ExamDescription = styled.p`
  color: #4a5568;
  margin: 0.5rem 0 0;
  font-size: 1rem;
`;

const exams = [
  {
    id: 'sat',
    title: 'SAT',
    description: 'College Admissions Test',
    icon: <FaPencilAlt />,
  },
  {
    id: 'gre',
    title: 'GRE',
    description: 'Graduate School Exam',
    icon: <FaBook />,
  }
];

const ExamsPage = () => {
  const navigate = useNavigate();

  const handleExamSelect = (examId) => {
    // Navigate to resource categories for the selected exam
    navigate(`/resource-categories/${examId}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <FaArrowLeft /> Back to Home
        </BackButton>
        <Title>Select Your Exam</Title>
        <Subtitle>Choose the standardized test you're preparing for to access relevant study materials.</Subtitle>
      </Header>
      
      <ExamsGrid>
        {exams.map((exam) => (
          <ExamCard 
            key={exam.id}
            onClick={() => handleExamSelect(exam.id)}
            aria-label={`Select ${exam.title}`}
          >
            <ExamIcon>{exam.icon}</ExamIcon>
            <ExamTitle>{exam.title}</ExamTitle>
            <ExamDescription>{exam.description}</ExamDescription>
          </ExamCard>
        ))}
      </ExamsGrid>
    </Container>
  );
};

export default ExamsPage;
