import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  margin: 0;
`;

const BackButton = styled.button`
  background: #718096;
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
    background: #4a5568;
  }
`;

const Form = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4a5568;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: #4299e1;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
    }
  }
`;

const ResourceItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const ResourceInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #c53030;
  }
`;

const AddButton = styled.button`
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
  margin-top: 1rem;
  
  &:hover {
    background: #38a169;
  }
`;

const SaveButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  
  &:hover {
    background: #3182ce;
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const AdminAddResource = () => {
  const { grade, subject, resourceType } = useParams();
  const navigate = useNavigate();
  const [resources, setResources] = useState([{ title: '', url: '' }]);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Format resource type for display
  const formatResourceType = (type) => {
    if (!type) return '';
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Load existing resources
  useEffect(() => {
    if (grade && subject && resourceType) {
      const savedResources = localStorage.getItem(`resources_${grade}_${subject}_${resourceType}`);
      if (savedResources) {
        setResources(JSON.parse(savedResources));
      } else {
        setResources([{ title: '', url: '' }]);
      }
    }
  }, [grade, subject, resourceType]);

  const handleAddResource = () => {
    setResources([...resources, { title: '', url: '' }]);
  };

  const handleRemoveResource = (index) => {
    if (resources.length > 1) {
      const newResources = [...resources];
      newResources.splice(index, 1);
      setResources(newResources);
    }
  };

  const handleResourceChange = (index, field, value) => {
    const newResources = [...resources];
    newResources[index] = { ...newResources[index], [field]: value };
    setResources(newResources);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate resources
    const hasEmptyFields = resources.some(resource => !resource.title.trim() || !resource.url.trim());
    if (hasEmptyFields) {
      setError('Please fill in all fields');
      return;
    }

    setIsSaving(true);

    try {
      // Save to localStorage
      localStorage.setItem(
        `resources_${grade}_${subject}_${resourceType}`,
        JSON.stringify(resources.filter(r => r.title.trim() && r.url.trim()))
      );
      setSuccess('Resources saved successfully!');
      setTimeout(() => {
        navigate(-1); // Go back to previous page
      }, 1500);
    } catch (err) {
      setError('Failed to save resources. Please try again.');
      console.error('Error saving resources:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </BackButton>
          <Title>Manage Resources</Title>
          <p>Grade {grade} • {subject} • {formatResourceType(resourceType)}</p>
        </div>
      </Header>

      <Form>
        {error && (
          <div style={{ 
            backgroundColor: '#fff5f5', 
            color: '#e53e3e', 
            padding: '1rem', 
            borderRadius: '6px',
            marginBottom: '1.5rem',
            border: '1px solid #fed7d7'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            backgroundColor: '#f0fff4', 
            color: '#38a169', 
            padding: '1rem', 
            borderRadius: '6px',
            marginBottom: '1.5rem',
            border: '1px solid #c6f6d5'
          }}>
            {success}
          </div>
        )}

        {resources.map((resource, index) => (
          <ResourceItem key={index}>
            <ResourceInput
              type="text"
              placeholder="Resource title"
              value={resource.title}
              onChange={(e) => handleResourceChange(index, 'title', e.target.value)}
            />
            <ResourceInput
              type="url"
              placeholder="https://example.com/resource"
              value={resource.url}
              onChange={(e) => handleResourceChange(index, 'url', e.target.value)}
            />
            <RemoveButton 
              onClick={() => handleRemoveResource(index)}
              title="Remove resource"
            >
              <FaTrash />
            </RemoveButton>
          </ResourceItem>
        ))}

        <AddButton onClick={handleAddResource}>
          <FaPlus /> Add Another Resource
        </AddButton>

        <SaveButton 
          onClick={handleSubmit}
          disabled={isSaving}
        >
          <FaSave />
          {isSaving ? 'Saving...' : 'Save Resources'}
        </SaveButton>
      </Form>
    </Container>
  );
};

export default AdminAddResource;
