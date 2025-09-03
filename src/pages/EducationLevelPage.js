import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaSchool, FaGraduationCap, FaUserGraduate, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';

// Image paths
const imagePaths = {
  elementary: '/elementry.png',
  middle: '/middleschool.png',
  high: '/highschool.png',
  college: '/college.png'
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 700px;
`;

const LevelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  margin: 0 auto;
`;

const LevelCard = styled.div`
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

const LevelIcon = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  svg {
    font-size: 3rem;
    color: #4299e1;
  }
`;

const LevelTitle = styled.h2`
  color: #2d3748;
  margin: 0.5rem 0;
  font-size: 1.5rem;
`;

const LevelDescription = styled.p`
  color: #4a5568;
  margin: 0.5rem 0 0;
  font-size: 1rem;
`;

const EducationLevelPage = () => {
  const navigate = useNavigate();

  const educationLevels = [
    {
      id: 'elementary',
      title: 'Elementary School',
      description: 'Grades 1-6',
      image: imagePaths.elementary,
      icon: <FaSchool />,
      grades: Array.from({ length: 6 }, (_, i) => i + 1), // Grades 1-6
      isExam: false
    },
    {
      id: 'middle',
      title: 'Middle School',
      description: 'Grades 7-8',
      image: imagePaths.middle,
      icon: <FaChalkboardTeacher />,
      grades: [7, 8],
      isExam: false
    },
    {
      id: 'high',
      title: 'High School',
      description: 'Grades 9-12',
      image: imagePaths.high,
      icon: <FaUserGraduate />,
      grades: [9, 10, 11, 12],
      isExam: false
    },
    {
      id: 'college',
      title: 'College',
      description: 'Higher Education',
      image: imagePaths.college,
      icon: <FaGraduationCap />,
      grades: ['freshman', 'sophomore', 'junior', 'senior'],
      isExam: false
    },
    {
      id: 'exams',
      title: 'Standardized Tests',
      description: 'SAT, GRE, and more',
      icon: <FaClipboardList />,
      isExam: true
    }
  ];

  const handleLevelSelect = (level) => {
    if (level.id === 'exams') {
      // Navigate to the exams selection page
      navigate('/exams');
    } else if (level.isExam) {
      // Navigate to the resource page for specific exams
      navigate(`/resources/${level.examType}`);
    } else {
      // Navigate to grade selection for regular education levels
      navigate(`/levels/${level.id}/grades`);
    }
  };

  return (
    <Container>
      <Title>Select Your Education Level</Title>
      <Subtitle>Choose the education level that best matches your current or desired learning path.</Subtitle>
      
      <LevelsGrid>
        {educationLevels.map((level) => (
          <LevelCard 
            key={level.id}
            onClick={() => handleLevelSelect(level)}
            aria-label={`Select ${level.title}`}
          >
            <LevelIcon>
              {level.image ? (
                <img src={level.image} alt={level.title} />
              ) : (
                level.icon
              )}
            </LevelIcon>
            <LevelTitle>{level.title}</LevelTitle>
            <LevelDescription>{level.description}</LevelDescription>
          </LevelCard>
        ))}
      </LevelsGrid>
    </Container>
  );
};

export default EducationLevelPage;
