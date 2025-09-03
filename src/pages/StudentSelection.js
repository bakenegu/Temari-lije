import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaBook, FaFlask, FaLaptopCode, FaCalculator, FaChevronLeft, FaGlobeAmericas, FaLandmark, FaLanguage } from 'react-icons/fa';

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
  const { levelId, grade } = useParams();
  const navigate = useNavigate();

  // Define subjects based on education level
  const getSubjects = () => {
    const commonSubjects = [
      {
        id: 'maths',
        title: 'Mathematics',
        icon: <FaCalculator />,
        description: 'Explore mathematical concepts and problem-solving skills.'
      },
      {
        id: 'science',
        title: 'Science',
        icon: <FaFlask />,
        description: 'Discover the wonders of the natural world.'
      },
      {
        id: 'english',
        title: 'English',
        icon: <FaBook />,
        description: 'Improve your language and literature skills.'
      },
      {
        id: 'language-arts',
        title: 'Language Arts',
        icon: <FaLanguage />,
        description: 'Enhance reading, writing, and communication skills.'
      },
      {
        id: 'social-studies',
        title: 'Social Studies',
        icon: <FaLandmark />,
        description: 'Explore history, culture, and society.'
      },
      {
        id: 'geography',
        title: 'Geography',
        icon: <FaGlobeAmericas />,
        description: 'Study the Earth\'s landscapes and environments.'
      },
      {
        id: 'ict',
        title: 'ICT',
        icon: <FaLaptopCode />,
        description: 'Learn about information and communication technology.'
      }
    ];

    // Add or modify subjects based on education level
    switch(levelId) {
      case 'elementary':
        return commonSubjects.filter(subject => 
          ['maths', 'science', 'english', 'language-arts', 'social-studies'].includes(subject.id)
        );
      case 'middle':
        return commonSubjects.filter(subject => 
          subject.id !== 'calculus' && subject.id !== 'physics'
        );
      case 'high':
        return commonSubjects;
      case 'college':
        return [
          ...commonSubjects,
          {
            id: 'calculus',
            title: 'Calculus',
            icon: <FaCalculator />,
            description: 'Advanced mathematical concepts and applications.'
          },
          {
            id: 'physics',
            title: 'Physics',
            icon: <FaFlask />,
            description: 'Study of matter, motion, and energy.'
          }
        ];
      default:
        return commonSubjects;
    }
  };

  const subjects = getSubjects();

  const handleSubjectSelect = (subject) => {
    navigate(`/content/${levelId}/${grade}/${subject}`);
  };

  const handleBack = () => {
    navigate(`/levels/${levelId}/grades`);
  };

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <FaChevronLeft /> Back to Grades
      </BackButton>
      
      <Header>
        <GradeTitle>
          {levelId === 'college' 
            ? `${grade.charAt(0).toUpperCase() + grade.slice(1)} Year` 
            : `Grade ${grade}`} Subjects
        </GradeTitle>
        <p>Select a subject to view available materials</p>
      </Header>
      
      <SubjectGrid>
        {subjects.map((subject) => (
          <SubjectCard 
            key={subject.id}
            onClick={() => handleSubjectSelect(subject.id)}
            aria-label={`${subject.title} for Grade ${grade}`}
          >
            <SubjectIcon>
              {React.cloneElement(subject.icon, { 
                size: levelId === 'elementary' ? 32 : 24 
              })}
            </SubjectIcon>
            <SubjectContent>
              <SubjectTitle>{subject.title}</SubjectTitle>
              <SubjectDescription>{subject.description}</SubjectDescription>
            </SubjectContent>
          </SubjectCard>
        ))}
      </SubjectGrid>
    </Container>
  );
};

export default StudentSelection;
