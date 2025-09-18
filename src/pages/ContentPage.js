import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  FaBookOpen,        // Reference Book
  FaChalkboardTeacher, // Live Session
  FaVideo,           // Video Lecture
  FaFileAlt,         // Lecture Note
  FaProjectDiagram,  // Interactive Simulation & Graphics
  FaChevronLeft
} from 'react-icons/fa';

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
  const { levelId, grade, subject } = useParams();
  const navigate = useNavigate();

  // Format subject for display
  const formatSubject = (subj) => {
    const subjectMap = {
      'maths': 'Mathematics',
      'science': 'Science',
      'english': 'English',
      'biology': 'Biology',
      'chemistry': 'Chemistry',
      'ict': 'ICT',
      'calculus': 'Calculus',
      'physics': 'Physics'
    };
    return subjectMap[subj] || subj;
  };

  const handleBack = () => {
    navigate(`/levels/${levelId}/grades`);
  };
  
  const handleResourceSelect = (resourceType) => {
    navigate(`/content/${levelId}/${grade}/${subject}/${resourceType}`);
  };

  const contentItems = [
    {
      id: 'reference-book',
      title: 'Reference Book',
      icon: <FaBookOpen />,
      description: 'Curated textbooks and reference books for deeper study',
      count: 'Updated regularly',
      type: 'reference-book'
    },
    {
      id: 'live-session',
      title: 'Live Session',
      icon: <FaChalkboardTeacher />,
      description: 'Join live classes and interact with teachers',
      count: 'See upcoming sessions',
      type: 'live-session'
    },
    {
      id: 'video-lecture',
      title: 'Video Lecture',
      icon: <FaVideo />,
      description: 'Comprehensive video lectures to learn at your pace',
      count: 'HD videos',
      type: 'video-lecture'
    },
    {
      id: 'lecture-note',
      title: 'Lecture Note',
      icon: <FaFileAlt />,
      description: 'Downloadable lecture notes and summaries',
      count: 'PDF/Docs',
      type: 'lecture-note'
    },
    {
      id: 'interactive-simulation-graphics',
      title: 'Interactive Simulation & Graphics',
      icon: <FaProjectDiagram />,
      description: 'Hands-on simulations and visualizations to explore concepts',
      count: 'Interactive content',
      type: 'interactive-simulation-graphics'
    }
  ];

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <FaChevronLeft /> Back to Subjects
      </BackButton>
      
      <PageHeader>
        <SubjectTitle>{formatSubject(subject)}</SubjectTitle>
        <GradeInfo>
          {levelId === 'college' 
            ? `${grade.charAt(0).toUpperCase() + grade.slice(1)} Year` 
            : `Grade ${grade}`} • Select a resource type to continue
        </GradeInfo>
      </PageHeader>
      
      <ContentGrid>
        {contentItems.map((item) => (
          <ContentCard 
            key={item.id}
            onClick={() => handleResourceSelect(item.type)}
            aria-label={`${item.title} for ${formatSubject(subject)}`}
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
