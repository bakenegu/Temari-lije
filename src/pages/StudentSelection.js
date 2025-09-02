import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaBook, FaFlask, FaLaptopCode, FaCalculator, FaAtom, FaBookOpen } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f7fa;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SubjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SubjectCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
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

const SubjectIcon = styled.div`
  background-color: #f0f9ff;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #0ea5e9;
`;

const SubjectContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const SubjectTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #1e40af;
  font-size: 1.25rem;
`;

const SubjectDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
`;

const GradeTitle = styled.h2`
  color: #1e40af;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
`;

const BackButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #3182ce;
  }
`;

const StudentSelection = () => {
  const params = useParams();
  const navigate = useNavigate();

  const subjects = [
    {
      id: 'maths',
      name: 'Mathematics',
      icon: <FaCalculator />,
      description: 'Algebra, Geometry, Calculus and more'
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: <FaAtom />,
      description: 'Mechanics, Thermodynamics, and more'
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: <FaBook />,
      description: 'Life sciences and living organisms'
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: <FaFlask />,
      description: 'Elements, compounds, and reactions'
    },
    {
      id: 'it',
      name: 'Information Technology',
      icon: <FaLaptopCode />,
      description: 'Computing and digital technologies'
    },
    {
      id: 'language-arts',
      name: 'Language Arts',
      icon: <FaBookOpen />,
      description: 'Reading, writing, and literature'
    }
  ];

  const handleSubjectClick = (subjectId) => {
    navigate(`/content/${params.grade}/${subjectId}`);
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        ← Back to Grades
      </BackButton>
      
      <Header>
        <GradeTitle>Grade {params.grade} Subjects</GradeTitle>
        <p>Select a subject to view available materials</p>
      </Header>
      
      <SubjectGrid>
        {subjects.map((subject) => (
          <SubjectCard 
            key={subject.id}
            onClick={() => handleSubjectClick(subject.id)}
            aria-label={`${subject.name} for Grade ${params.grade}`}
          >
            <SubjectIcon>
              {subject.icon}
            </SubjectIcon>
            <SubjectContent>
              <SubjectTitle>{subject.name}</SubjectTitle>
              <SubjectDescription>{subject.description}</SubjectDescription>
            </SubjectContent>
          </SubjectCard>
        ))}
      </SubjectGrid>
    </Container>
  );
};

export default StudentSelection;
