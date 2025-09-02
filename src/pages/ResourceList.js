import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { 
  FaPlus, 
  FaArrowLeft, 
  FaExternalLinkAlt, 
  FaTrash, 
  FaPlusCircle,
  FaQuestionCircle,
  FaVideo,
  FaBook,
  FaTasks,
  FaFileAlt,
  FaGraduationCap,
  FaEdit
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 200px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  margin: 0;
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
  
  &:hover {
    background: #3182ce;
  }
`;

const AddButton = styled(Link)`
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  
  &:hover {
    background: #38a169;
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ResourceCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e2e8f0;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e0;
  }
`;

const ResourceIcon = styled.div`
  font-size: 2.5rem;
  color: #4299e1;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #ebf8ff;
  border-radius: 50%;
`;

const ResourceContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ResourceTitle = styled.h3`
  font-size: 1.25rem;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
`;

const ResourceDescription = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  flex-grow: 1;
`;

const ResourceCount = styled.span`
  display: inline-block;
  background-color: #ebf8ff;
  color: #2b6cb0;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  align-self: flex-start;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 0.25rem;
  margin: 0 0.25rem;
  border-radius: 4px;
  
  &:hover {
    background-color: #edf2f7;
    color: #2d3748;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4a5568;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #4299e1;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const CancelButton = styled.button`
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background: #cbd5e0;
  }
`;

const SaveButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background: #3182ce;
  }
`;

// Format resource type for display
const formatResourceType = (type) => {
  if (!type) return '';
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Format subject name for display
const formatSubjectName = (subject) => {
  const subjectMap = {
    'maths': 'Mathematics',
    'biology': 'Biology',
    'chemistry': 'Chemistry',
    'it': 'Information Technology',
    'physics': 'Physics',
    'english': 'English',
    'amharic': 'Amharic',
    'civics': 'Civics',
    'history': 'History',
    'geography': 'Geography',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'biology': 'Biology'
  };
  return subjectMap[subject] || subject;
};

// Resource List Component
const ResourceList = ({ isUndergraduate = false }) => {
  const { grade, subject, resourceType, departmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load resources from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    try {
      if (isUndergraduate) {
        // For undergraduate, we'll use a default view if no resourceType is specified
        const storageKey = resourceType 
          ? `undergraduate_${departmentId}_${resourceType}` 
          : `undergraduate_${departmentId}_resources`;
        
        const savedResources = localStorage.getItem(storageKey);
        if (savedResources) {
          setResources(JSON.parse(savedResources));
        } else {
          setResources([]);
        }
      } else {
        // For regular resources
        const storageKey = `resources_${grade}_${subject}_${resourceType}`;
        const savedResources = localStorage.getItem(storageKey);
        if (savedResources) {
          setResources(JSON.parse(savedResources));
        } else {
          setResources([]);
        }
      }
    } catch (error) {
      console.error('Error loading resources:', error);
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  }, [grade, subject, resourceType, isUndergraduate, departmentId]);

  const handleDeleteResource = (id) => {
    const updatedResources = resources.filter(resource => resource.id !== id);
    setResources(updatedResources);
    
    const storageKey = isUndergraduate 
      ? 'undergraduate_resources'
      : `resources_${grade}_${subject}_${resourceType}`;
      
    localStorage.setItem(storageKey, JSON.stringify(updatedResources));
  };

  if (isLoading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading resources...</p>
        </div>
      </Container>
    );
  }

  // Sample resource data for undergraduate departments
  const undergraduateResources = [
    {
      id: 'questions',
      title: 'Questions',
      icon: <FaQuestionCircle />,
      description: 'Practice questions and quizzes to test your understanding',
      count: '150+ Questions'
    },
    {
      id: 'live-sessions',
      title: 'Live Sessions',
      icon: <FaVideo />,
      description: 'Interactive live classes and recorded lectures',
      count: '20+ Sessions'
    },
    {
      id: 'reference-materials',
      title: 'Reference Materials',
      icon: <FaBook />,
      description: 'Textbooks, articles, and study guides',
      count: '50+ Resources'
    },
    {
      id: 'assignments',
      title: 'Assignments',
      icon: <FaTasks />,
      description: 'Course assignments and projects',
      count: '30+ Assignments'
    },
    {
      id: 'past-papers',
      title: 'Past Papers',
      icon: <FaFileAlt />,
      description: 'Previous exam papers and solutions',
      count: '100+ Papers'
    },
    {
      id: 'tutorials',
      title: 'Tutorials',
      icon: <FaGraduationCap />,
      description: 'Step-by-step tutorials and guides',
      count: '40+ Tutorials'
    }
  ];

  return (
    <Container>
      <Header>
        <div>
          <BackButton onClick={() => isUndergraduate ? navigate('/undergraduate') : navigate(-1)}>
            <FaArrowLeft /> {isUndergraduate ? 'Back to Departments' : 'Back'}
          </BackButton>
          <Title>
            {isUndergraduate ? 
              `${departmentId ? `${departmentId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Department` : 'Undergraduate'}` : 
              formatResourceType(resourceType)} Resources
          </Title>
          {!isUndergraduate && (
            <p>Grade {grade} • {formatSubjectName(subject)}</p>
          )}
        </div>
        
        {user?.role === 'admin' && (
          <AddButton 
            to={isUndergraduate 
              ? `/admin/add-resource/undergraduate/${departmentId || 'general'}/resources`
              : `/admin/add-resource/${grade}/${subject}/${resourceType}`}
          >
            <FaPlus /> Add Resource
          </AddButton>
        )}
      </Header>

      {isUndergraduate ? (
        <ResourceGrid>
          {undergraduateResources.map((resource) => (
            <ResourceCard 
              key={resource.id}
              onClick={() => navigate(`/undergraduate/${departmentId}/resources/${resource.id}`)}
              aria-label={`${resource.title} for ${departmentId || 'undergraduate'}`}
            >
              <ResourceIcon>{resource.icon}</ResourceIcon>
              <ResourceContent>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceDescription>{resource.description}</ResourceDescription>
                <ResourceCount>{resource.count}</ResourceCount>
              </ResourceContent>
            </ResourceCard>
          ))}
        </ResourceGrid>
      ) : resources.length > 0 ? (
        <ResourceGrid>
          {resources.map((resource) => (
            <ResourceCard 
              key={resource.id}
              as="div"
              onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
            >
              <ResourceIcon>
                <FaExternalLinkAlt />
              </ResourceIcon>
              <ResourceContent>
                <ResourceTitle>
                  {resource.title}
                </ResourceTitle>
                {resource.description && (
                  <ResourceDescription>{resource.description}</ResourceDescription>
                )}
                {user?.role === 'admin' && (
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <ActionButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle edit
                      }}
                      aria-label={`Edit ${resource.title}`}
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteResource(resource.id);
                      }}
                      aria-label={`Delete ${resource.title}`}
                    >
                      <FaTrash />
                    </ActionButton>
                  </div>
                )}
              </ResourceContent>
            </ResourceCard>
          ))}
        </ResourceGrid>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          color: '#718096',
          border: '1px dashed #cbd5e0',
          marginTop: '1rem'
        }}>
          <FaPlusCircle size={32} style={{ marginBottom: '1rem', color: '#a0aec0' }} />
          <h3>No resources available</h3>
          <p>There are no resources added for this section yet.</p>
          {user?.role === 'admin' && (
            <AddButton 
              to={`/admin/add-resource/${grade}/${subject}/${resourceType}`}
              style={{ marginTop: '1rem', display: 'inline-flex' }}
            >
              <FaPlus /> Add Your First Resource
            </AddButton>
          )}
        </div>
      )}

      {/* Resource adding is now handled in a separate admin page */}
    </Container>
  );
};

export default ResourceList;
