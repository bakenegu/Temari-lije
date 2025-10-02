import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaVideo, FaFilePdf, FaBookOpen, FaLaptopCode, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';

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
  max-width: 1000px;
  margin: 0 auto;
`;
// Card with class-based modifiers and hover child targeting
const CategoryCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: transparent;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    background: white;
  }

  /* Hover effect for child icon without component selectors */
  &:hover .icon {
    transform: scale(1.05);
  }

  &.info-card {
    background: #f0f9ff;
    box-shadow: 0 4px 6px rgba(66, 153, 225, 0.2);
    border: 1px solid #bee3f8;

    &::before {
      background: #4299e1;
    }

    &:hover {
      box-shadow: 0 10px 20px rgba(66, 153, 225, 0.25);
      background: #e6f2ff;
    }

    &:hover .icon {
      transform: scale(1.1);
    }
  }
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  color: #4299e1;
  margin-bottom: 1rem;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  .info-card & {
    color: #2b6cb0;
    background: #e6f2ff;
  }
`;

const CategoryTitle = styled.h2`
  color: #2d3748;
  margin: 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 500;

  .info-card & {
    color: #2b6cb0;
    font-weight: 600;
  }
`;

const CategoryDescription = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  margin: 0.25rem 0 0;
  min-height: 20px;
`;


const resourceCategories = (examId) => [
  ...(examId === 'sat' ? [{
    id: 'about-sat',
    title: 'About SAT',
    description: 'Learn what the SAT is, its format, and how to prepare',
    icon: <FaInfoCircle />,
    isInfo: true
  }] : []),
  ...(examId === 'gre' ? [{
    id: 'about-gre',
    title: 'About GRE',
    description: 'Understand the GRE format, sections, and scoring',
    icon: <FaInfoCircle />,
    isInfo: true
  }] : []),
  {
    id: 'videos',
    title: 'Video Lessons',
    description: 'Comprehensive video tutorials',
    icon: <FaVideo />,
  },
  {
    id: 'practice-tests',
    title: 'Practice Tests',
    description: 'Full-length practice exams',
    icon: <FaFilePdf />,
  },
  {
    id: 'study-guides',
    title: 'Study Guides',
    description: 'Detailed subject reviews',
    icon: <FaBookOpen />,
  },
  {
    id: 'interactive',
    title: 'Interactive Exercises',
    description: 'Practice problems and quizzes',
    icon: <FaLaptopCode />,
  }
];

const ResourceCategoriesPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  // Convert examId to display name
  const examName = examId === 'sat' ? 'SAT' : 'GRE';

  const handleBack = () => {
    navigate('/exams');
  };

  const handleCategorySelect = (categoryId) => {
    if (categoryId === 'about-sat' || categoryId === 'about-gre') {
      // Navigate to the dedicated exam info page for SAT or GRE
      navigate(`/exams/${examId}/info`);
    } else {
      // Navigate to the resource list page with exam type and category
      navigate(`/content/exams/${examId}/${categoryId}`);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <FaArrowLeft /> Back to Exams
        </BackButton>
        <Title>{examName} Study Resources</Title>
        <Subtitle>
          Select a resource type to access study materials for the {examName} exam
        </Subtitle>
      </Header>

      <CategoriesGrid>
        {resourceCategories(examId).map((category) => (
          <CategoryCard
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            aria-label={category.title}
            className={category.isInfo ? 'info-card' : ''}
          >
            <CategoryIcon className="icon">{category.icon}</CategoryIcon>
            <CategoryTitle>{category.title}</CategoryTitle>
            {category.description && (
              <CategoryDescription>{category.description}</CategoryDescription>
            )}
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </Container>
  );
}
export default ResourceCategoriesPage;
