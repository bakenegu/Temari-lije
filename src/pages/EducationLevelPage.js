import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaSchool, FaGraduationCap, FaUserGraduate, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';

// Image paths
const imagePaths = {
  elementary: '/elementry.png',
  middle: '/middleschool.png',
  high: '/highschool.png',
  college: '/college.png',
  exams: '/SATGRE.png'
};

const PageBackground = styled('div')({
  width: '100%',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
  position: 'relative',
  overflow: 'hidden',
  background: 'url(\'/ethiopia.png\') no-repeat center center fixed',
  backgroundSize: '100% 100%',
  backgroundAttachment: 'fixed',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 0
  },
  '& > *': {
    position: 'relative',
    zIndex: 1
  }
});

const Container = styled('div')({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 768px)': {
    padding: '1rem'
  }
});

const Title = styled('h1')({
  color: '#1a365d',
  fontSize: '3rem',
  marginBottom: '1.5rem',
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  fontWeight: 700,
  letterSpacing: '-0.5px',
  background: 'linear-gradient(45deg, #1a365d, #2c5282)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  paddingBottom: '1rem',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, #e53e3e, #dd6b20)',
    borderRadius: '2px'
  },
  '@media (max-width: 768px)': {
    fontSize: '2.2rem'
  }
});

const Subtitle = styled('p')({
  color: '#4a5568',
  fontSize: '1.3rem',
  marginBottom: '3rem',
  textAlign: 'center',
  maxWidth: '700px',
  lineHeight: 1.6,
  fontWeight: 400,
  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
  padding: '0 1rem',
  '@media (max-width: 768px)': {
    fontSize: '1.1rem',
    marginBottom: '2rem'
  }
});

const LevelsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  width: '100%',
  padding: '1.5rem',
  justifyContent: 'center'
});

const ContainerWrapper = styled('div')({
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto'
});

const LevelCard = styled('div')(() => ({
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
    background: 'rgba(255, 255, 255, 0.98)'
  }
}));

const ImageContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '220px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
  padding: '1.5rem',
  transition: 'all 0.3s ease',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '8px',
    transition: 'transform 0.3s ease, filter 0.3s ease',
    filter: 'grayscale(20%) contrast(110%)'
  },
  '&:hover img': {
    transform: 'scale(1.05)',
    filter: 'grayscale(0%) contrast(120%)'
  }
});

const Content = styled('div')({
  padding: '1.8rem',
  textAlign: 'center',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '120px' // Ensure minimum height for content
});

const IconContainer = styled('div')({
  fontSize: '2rem',
  color: '#4299e1',
  marginBottom: '0.5rem'
});

const LevelTitle = styled('h2')({
  color: '#2d3748',
  fontSize: '1.5rem',
  margin: '0 0 0.5rem 0'
});

const LevelDescription = styled('p')({
  color: '#718096',
  margin: 0,
  fontSize: '1rem'
});

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
      image: imagePaths.exams,
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
    <PageBackground>
      <Container>
        <Title>Select Your Education Level</Title>
      <Subtitle>Choose the education level that best matches your current or desired learning path.</Subtitle>
      
      <ContainerWrapper>
        <LevelsGrid>
        {educationLevels.map((level) => (
          <LevelCard 
            key={level.id}
            onClick={() => handleLevelSelect(level)}
            aria-label={`Select ${level.title}`}
          >
            {level.image ? (
              <ImageContainer>
                <img src={level.image} alt={level.title} />
              </ImageContainer>
            ) : (
              <IconContainer>
                {level.icon}
              </IconContainer>
            )}
            <Content>
              <LevelTitle>{level.title}</LevelTitle>
              <LevelDescription>{level.description}</LevelDescription>
            </Content>
          </LevelCard>
        ))}
      </LevelsGrid>
      </ContainerWrapper>
      </Container>
    </PageBackground>
  );
};

export default EducationLevelPage;
