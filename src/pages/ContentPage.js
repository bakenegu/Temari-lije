import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaQuestionCircle, FaChalkboardTeacher, FaBookOpen, FaBookReader } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #3182ce;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SubjectTitle = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const GradeInfo = styled.p`
  color: #718096;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: #4299e1;
  }
`;

const CardIcon = styled.div`
  background-color: #f0f9ff;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #0ea5e9;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #1e40af;
  font-size: 1.5rem;
`;

const CardDescription = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin: 0 0 1.5rem;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  color: #4a5568;
  font-size: 0.9rem;
  margin-top: auto;
`;

const ContentPage = () => {
  const { grade, subject } = useParams();
  const navigate = useNavigate();

  const subjectName = {
    'maths': 'Mathematics',
    'biology': 'Biology',
    'chemistry': 'Chemistry',
    'it': 'Information Technology'
  }[subject] || subject;

  const contentItems = [
    {
      id: 'questions',
      title: 'Questions',
      icon: <FaQuestionCircle />,
      description: 'Practice questions and quizzes to test your understanding',
      count: '150+ Questions'
    },
    {
      id: 'live-session',
      title: 'Live Session',
      icon: <FaChalkboardTeacher />,
      description: 'Join live classes and interact with teachers',
      count: 'Next session: Today 2:00 PM'
    },
    {
      id: 'reference',
      title: 'Reference Materials',
      icon: <FaBookOpen />,
      description: 'Additional study materials and resources',
      count: '25+ Resources'
    },
    {
      id: 'lessons',
      title: 'Lessons',
      icon: <FaBookReader />,
      description: 'Comprehensive video and text lessons',
      count: '12 Lessons'
    }
  ];

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        ← Back to Subjects
      </BackButton>
      
      <PageHeader>
        <SubjectTitle>{subjectName}</SubjectTitle>
        <GradeInfo>Grade {grade} • {subjectName}</GradeInfo>
      </PageHeader>
      
      <ContentGrid>
        {contentItems.map((item) => (
          <ContentCard 
            key={item.id}
            onClick={() => {}}
            aria-label={`${item.title} for ${subjectName}`}
          >
            <CardIcon>
              {item.icon}
            </CardIcon>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <CardFooter>{item.count}</CardFooter>
            </CardContent>
          </ContentCard>
        ))}
      </ContentGrid>
    </Container>
  );
};

export default ContentPage;
