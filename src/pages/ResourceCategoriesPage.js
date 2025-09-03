import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaVideo, FaFilePdf, FaBookOpen, FaLaptopCode, FaArrowLeft } from 'react-icons/fa';

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
  margin-bottom: 1rem;
  
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
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

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  color: #4299e1;
  margin-bottom: 1rem;
`;

const CategoryTitle = styled.h2`
  color: #2d3748;
  margin: 0.5rem 0;
  font-size: 1.25rem;
`;

const resourceCategories = [
  {
    id: 'videos',
    title: 'Video Lessons',
    icon: <FaVideo />,
  },
  {
    id: 'practice-tests',
    title: 'Practice Tests',
    icon: <FaFilePdf />,
  },
  {
    id: 'study-guides',
    title: 'Study Guides',
    icon: <FaBookOpen />,
  },
  {
    id: 'interactive',
    title: 'Interactive Exercises',
    icon: <FaLaptopCode />,
  }
];

const ResourceCategoriesPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  // Convert examId to display name
  const examName = examId === 'sat' ? 'SAT' : 'GRE';

  const handleCategorySelect = (categoryId) => {
    // Navigate to the resource list page with exam type and category
    // The URL will be like: /content/exams/[examId]/[categoryId]
    navigate(`/content/exams/${examId}/${categoryId}`);
  };

  const handleBack = () => {
    navigate('/exams');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <FaArrowLeft /> Back to Exams
        </BackButton>
        <Title>{examName} Study Resources</Title>
        <Subtitle>Select a resource type to access study materials for the {examName} exam</Subtitle>
      </Header>
      
      <CategoriesGrid>
        {resourceCategories.map((category) => (
          <CategoryCard 
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            aria-label={`Select ${category.title}`}
          >
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryTitle>{category.title}</CategoryTitle>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </Container>
  );
};

export default ResourceCategoriesPage;
