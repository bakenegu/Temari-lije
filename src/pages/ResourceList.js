import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { 
  FaPlus, 
  FaArrowLeft, 
  FaExternalLinkAlt, 
  FaTrash, 
  FaPlusCircle 
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

const ResourceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  table-layout: fixed;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: middle;
  }

  th {
    background-color: #f7fafc;
    font-weight: 600;
    color: #4a5568;
    position: sticky;
    top: 0;
  }

  tr:hover {
    background-color: #f8fafc;
  }
  
  .title-col {
    width: 60%;
  }
  
  .actions-col {
    width: 100px;
    text-align: right;
  }
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
const ResourceList = () => {
  const { grade, subject, resourceType } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load resources from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    try {
      const savedResources = localStorage.getItem(`resources_${grade}_${subject}_${resourceType}`);
      if (savedResources) {
        setResources(JSON.parse(savedResources));
      } else {
        setResources([]);
      }
    } catch (error) {
      console.error('Error loading resources:', error);
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  }, [grade, subject, resourceType]);

  const handleDeleteResource = (id) => {
    const updatedResources = resources.filter(resource => resource.id !== id);
    setResources(updatedResources);
    localStorage.setItem(
      `resources_${grade}_${subject}_${resourceType}`,
      JSON.stringify(updatedResources)
    );
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

  return (
    <Container>
      <Header>
        <div>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </BackButton>
          <Title>{formatResourceType(resourceType)} Resources</Title>
          <p>Grade {grade} • {formatSubjectName(subject)}</p>
        </div>
        
        {user?.role === 'admin' && (
          <AddButton to={`/admin/add-resource/${grade}/${subject}/${resourceType}`}>
            <FaPlus /> Add Resource
          </AddButton>
        )}
      </Header>

      {resources.length > 0 ? (
        <ResourceTable>
          <thead>
            <tr>
              <th className="title-col">Resource Title</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#3182ce',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      wordBreak: 'break-word'
                    }}
                    title={resource.url}
                  >
                    {resource.title}
                    <FaExternalLinkAlt size={12} />
                  </a>
                </td>
                <td>
                  {user?.role === 'admin' && (
                    <>
                      <ActionButton 
                        onClick={() => handleDeleteResource(resource.id)}
                        title="Delete resource"
                        style={{ color: '#e53e3e' }}
                      >
                        <FaTrash />
                      </ActionButton>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </ResourceTable>
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
