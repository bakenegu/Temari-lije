import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { 
  FaPlus, 
  FaArrowLeft, 
  FaExternalLinkAlt, 
  FaTrash, 
  FaPlusCircle,
  FaMinusSquare,
  FaTrashAlt
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { listResources, deleteResource as apiDeleteResource } from '../api/resourcesApi';

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
const ResourceList = ({ isExam = false }) => {
  const { levelId, grade, subject, resourceType, examId } = useParams();
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (isExam) {
      navigate(`/resource-categories/${examId}`);
    } else {
      navigate(`/content/${levelId}/${grade}/${subject}`);
    }
  };
  
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResources, setSelectedResources] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  // Load resources from backend API on component mount
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    (async () => {
      try {
        const data = await listResources({
          isExam,
          examId,
          levelId,
          grade,
          subject,
          resourceType,
        });
        if (isMounted) setResources(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading resources:', error);
        if (isMounted) setResources([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [isExam, levelId, grade, subject, resourceType, examId]);

  const handleDeleteResource = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    // Optimistic update
    const prev = resources;
    setResources(resources.filter(r => r.id !== id));
    try {
      await apiDeleteResource({ isExam, examId, levelId, grade, subject, resourceType }, id);
    } catch (e) {
      console.error('Delete failed, reverting:', e);
      setResources(prev);
      alert('Failed to delete resource. Please try again.');
    }
  };

  const toggleResourceSelection = (id) => {
    setSelectedResources(prev => {
      if (prev.includes(id)) {
        return prev.filter(resourceId => resourceId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedResources.length === resources.length) {
      // Deselect all
      setSelectedResources([]);
    } else {
      // Select all
      setSelectedResources(resources.map(r => r.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedResources.length === 0) return;
    
    setShowBulkDeleteConfirm(true);
  };

  const confirmBulkDelete = async () => {
    setIsDeleting(true);
    const prev = resources;
    // Optimistic update
    setResources(resources.filter(r => !selectedResources.includes(r.id)));
    
    try {
      // Delete each selected resource
      const deletePromises = selectedResources.map(id => 
        apiDeleteResource({ isExam, examId, levelId, grade, subject, resourceType }, id)
      );
      
      await Promise.all(deletePromises);
      setSelectedResources([]);
    } catch (e) {
      console.error('Bulk delete failed:', e);
      setResources(prev);
      alert('Failed to delete some resources. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowBulkDeleteConfirm(false);
    }
  };

  const cancelBulkDelete = () => {
    setShowBulkDeleteConfirm(false);
  };

  // Detect and extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      const host = u.hostname.replace(/^www\./, '');

      // youtu.be/<id>
      if (host === 'youtu.be') {
        const seg = u.pathname.split('/').filter(Boolean);
        return seg[0] || null;
      }

      // youtube.com/watch?v=<id>
      const v = u.searchParams.get('v');
      if (v) return v;

      // youtube.com/embed/<id> or /shorts/<id> or /v/<id>
      const parts = u.pathname.split('/').filter(Boolean);
      if (parts.length >= 2 && ['embed', 'shorts', 'v'].includes(parts[0])) {
        return parts[1];
      }

      return null;
    } catch (e) {
      return null;
    }
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
          <BackButton onClick={handleBack}>
            <FaArrowLeft /> Back
          </BackButton>
          <Title>{formatResourceType(resourceType)} Resources</Title>
          <p>
            {isExam 
              ? `${examId.toUpperCase()} Exam`
              : levelId === 'college' 
                ? `${grade.charAt(0).toUpperCase() + grade.slice(1)} Year` 
                : `Grade ${grade} • ${formatSubjectName(subject)}`}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {user?.role === 'admin' && selectedResources.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              style={{
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaTrashAlt /> Delete Selected ({selectedResources.length})
            </button>
          )}
          
          {user?.role === 'admin' && (
            isExam ? (
              <AddButton to={`/admin/add-resource/exams/${examId}/${resourceType}`}>
                <FaPlus /> Add Resource
              </AddButton>
            ) : (
              <AddButton to={`/admin/add-resource/${levelId}/${grade}/${subject}/${resourceType}`}>
                <FaPlus /> Add Resource
              </AddButton>
            )
          )}
        </div>
      </Header>

      {resources.length > 0 ? (
        <ResourceTable>
          <thead>
            <tr>
              {user?.role === 'admin' && (
                <th style={{ width: '40px', textAlign: 'center' }}>
                  <ActionButton 
                    onClick={toggleSelectAll}
                    title={selectedResources.length === resources.length ? 'Deselect all' : 'Select all'}
                  >
                    {selectedResources.length === resources.length ? (
                      <FaMinusSquare size={18} />
                    ) : selectedResources.length > 0 ? (
                      <FaMinusSquare size={18} style={{ opacity: 0.5 }} />
                    ) : (
                      <div style={{ width: 18, height: 18, border: '1px solid #718096', borderRadius: '2px' }} />
                    )}
                  </ActionButton>
                </th>
              )}
              <th className="title-col">Resource Title</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => {
              const stableKey = resource?.id ?? resource?.uuid ?? `${resource?.title || 'resource'}-${index}`;
              return (
              <tr key={stableKey}>
                {user?.role === 'admin' && (
                  <td style={{ textAlign: 'center' }}>
                    <ActionButton 
                      onClick={() => toggleResourceSelection(resource.id)}
                      title={selectedResources.includes(resource.id) ? 'Deselect' : 'Select'}
                    >
                      {selectedResources.includes(resource.id) ? (
                        <div style={{ 
                          width: 18, 
                          height: 18, 
                          border: '1px solid #4299e1', 
                          backgroundColor: '#4299e1', 
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                        </div>
                      ) : (
                        <div style={{ width: 18, height: 18, border: '1px solid #718096', borderRadius: '2px' }} />
                      )}
                    </ActionButton>
                  </td>
                )}
                <td>
                  {(() => {
                    const videoId = getYouTubeVideoId(resource.url);
                    if (videoId) {
                      return (
                        <Link
                          to={`/watch/youtube/${videoId}`}
                          state={{ title: resource.title, sourceUrl: resource.url }}
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
                        </Link>
                      );
                    }
                    return (
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
                    );
                  })()}
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
              );
            })}
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
            isExam ? (
              <AddButton 
                to={`/admin/add-resource/exams/${examId}/${resourceType}`}
                style={{ marginTop: '1rem', display: 'inline-flex' }}
              >
                <FaPlus /> Add Your First Resource
              </AddButton>
            ) : (
              <AddButton 
                to={`/admin/add-resource/${levelId}/${grade}/${subject}/${resourceType}`}
                style={{ marginTop: '1rem', display: 'inline-flex' }}
              >
                <FaPlus /> Add Your First Resource
              </AddButton>
            )
          )}
        </div>
      )}

      {/* Bulk delete confirmation modal */}
      {showBulkDeleteConfirm && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ marginTop: 0 }}>Confirm Deletion</h2>
            <p>Are you sure you want to delete {selectedResources.length} selected resources?</p>
            <p style={{ color: '#e53e3e' }}>This action cannot be undone.</p>
            
            <ButtonGroup>
              <CancelButton onClick={cancelBulkDelete} disabled={isDeleting}>
                Cancel
              </CancelButton>
              <SaveButton 
                onClick={confirmBulkDelete} 
                disabled={isDeleting}
                style={{ background: '#e53e3e' }}
              >
                {isDeleting ? 'Deleting...' : 'Delete Resources'}
              </SaveButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Resource adding is now handled in a separate admin page */}
    </Container>
  );
};

export default ResourceList;
