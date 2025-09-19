import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowLeft, FaSave, FaPlus, FaTrash, FaFileImport, FaTimes, FaUpload, FaFileExcel, FaFileCsv } from 'react-icons/fa';
import { listResources, saveResources } from '../../api/resourcesApi';

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

const ImportButton = styled.button`
  background: #805ad5;
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
  margin-left: 1rem;
  
  &:hover {
    background: #6b46c1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const Modal = styled.div`
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
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #718096;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  
  &:hover {
    background-color: #f7fafc;
    color: #e53e3e;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  font-family: monospace;
  margin-bottom: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const FileUploadContainer = styled.div`
  border: 2px dashed #cbd5e0;
  border-radius: 6px;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  background-color: #f7fafc;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #4299e1;
    background-color: #ebf8ff;
  }
  
  &.drag-active {
    border-color: #4299e1;
    background-color: #ebf8ff;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileUploadButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #3182ce;
  }
`;

const FileInfo = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #4a5568;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1.2rem;
    color: #4299e1;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #718096;
  font-size: 0.9rem;
  
  &:before, &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }
  
  &:before {
    margin-right: 0.5rem;
  }
  
  &:after {
    margin-left: 0.5rem;
  }
`;

const AdminAddResource = () => {
  const { levelId, grade, subject, resourceType, examId } = useParams();
  const isExam = !!examId;
  const navigate = useNavigate();
  const [resources, setResources] = useState([{ title: '', url: '' }]);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Format subject for display
  const formatSubject = (subj) => {
    const subjectMap = {
      'maths': 'Mathematics',
      'science': 'Science',
      'english': 'English',
      'ict': 'ICT',
      'calculus': 'Calculus',
      'physics': 'Physics'
    };
    return subjectMap[subj] || subj;
  };

  // Format resource type for display
  const formatResourceType = (type) => {
    if (!type) return '';
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const examName = examId === 'sat' ? 'SAT' : examId === 'gre' ? 'GRE' : (examId ? examId.toUpperCase() : '');

  // Load existing resources from backend
  useEffect(() => {
    let isMounted = true;
    (async () => {
      if ((isExam && examId && resourceType) || (!isExam && levelId && grade && subject && resourceType)) {
        try {
          const data = await listResources({
            isExam,
            examId,
            levelId,
            grade,
            subject,
            resourceType,
          });
          if (isMounted) {
            setResources(Array.isArray(data) && data.length > 0 ? data : [{ title: '', url: '' }]);
          }
        } catch (e) {
          console.error('Failed to load resources:', e);
          if (isMounted) setResources([{ title: '', url: '' }]);
        }
      }
    })();
    return () => { isMounted = false; };
  }, [isExam, examId, levelId, grade, subject, resourceType]);

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

  const handleSubmit = async (e) => {
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
      const payload = resources.filter(r => r.title.trim() && r.url.trim());
      await saveResources({
        isExam,
        examId,
        levelId,
        grade,
        subject,
        resourceType,
      }, payload);
      setSuccess('Resources saved successfully!');
      setTimeout(() => {
        if (isExam) {
          navigate(`/content/exams/${examId}/${resourceType}`);
        } else {
          navigate(`/content/${levelId}/${grade}/${subject}/${resourceType}`);
        }
      }, 1200);
    } catch (err) {
      console.error('Error saving resources:', err);
      setError('Failed to save resources. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (isExam) {
      navigate(`/content/exams/${examId}/${resourceType}`);
    } else {
      navigate(`/content/${levelId}/${grade}/${subject}/${resourceType}`);
    }
  };

  const openImportModal = () => {
    setImportText('');
    setImportError('');
    setUploadedFile(null);
    setShowImportModal(true);
  };

  const closeImportModal = () => {
    setShowImportModal(false);
  };

  const handleImportTextChange = (e) => {
    setImportText(e.target.value);
    setImportError('');
    setUploadedFile(null);
  };
  
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setImportText('');
      setImportError('');
      
      // Auto-process the file
      readAndParseFile(file);
    }
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      setImportText('');
      setImportError('');
      
      // Auto-process the file
      readAndParseFile(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const readAndParseFile = (file) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target.result;
      
      // For CSV files
      if (file.name.toLowerCase().endsWith('.csv')) {
        setImportText(content);
        parseImportText(content);
      } 
      // For Excel files (attempt to parse as CSV)
      else if (file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls')) {
        setImportError('Excel files need to be saved as CSV first. Please export your Excel file as CSV and try again.');
      }
      // For text files
      else if (file.name.toLowerCase().endsWith('.txt')) {
        setImportText(content);
        parseImportText(content);
      }
      // For JSON files
      else if (file.name.toLowerCase().endsWith('.json')) {
        setImportText(content);
        parseImportText(content);
      }
      else {
        setImportError('Unsupported file type. Please upload a CSV, TXT, or JSON file.');
      }
    };
    
    reader.onerror = () => {
      setImportError('Error reading file. Please try again.');
    };
    
    reader.readAsText(file);
  };

  const parseImportText = (textContent) => {
    const contentToProcess = textContent || importText;
    
    if (!contentToProcess || !contentToProcess.trim()) {
      setImportError('Please enter some data to import or upload a file');
      return;
    }

    try {
      // Try parsing as JSON first
      try {
        const jsonData = JSON.parse(contentToProcess);
        if (Array.isArray(jsonData)) {
          const validResources = jsonData
            .filter(item => item && typeof item === 'object')
            .map(item => ({
              id: item.id || '',
              title: item.title || item.name || '',
              url: item.url || item.link || ''
            }))
            .filter(item => item.title && item.url);

          if (validResources.length === 0) {
            setImportError('No valid resources found in JSON. Each item needs title/name and url/link properties.');
            return;
          }

          setResources(prev => [...prev, ...validResources]);
          setShowImportModal(false);
          setSuccess(`Successfully imported ${validResources.length} resources`);
          return;
        }
      } catch (e) {
        // Not valid JSON, continue to CSV parsing
      }

      // Parse as CSV/TSV or line-based format
      const lines = contentToProcess.split(/\r?\n/).filter(line => line.trim());
      const parsedResources = [];

      for (const line of lines) {
        // Try different delimiters: tab, comma, pipe, semicolon
        let parts = [];
        if (line.includes('\t')) {
          parts = line.split('\t');
        } else if (line.includes(',')) {
          parts = line.split(',');
        } else if (line.includes('|')) {
          parts = line.split('|');
        } else if (line.includes(';')) {
          parts = line.split(';');
        } else {
          // Try to extract URL from the line
          const urlMatch = line.match(/https?:\/\/[^\s]+/i);
          if (urlMatch) {
            const url = urlMatch[0];
            const title = line.replace(url, '').trim() || url;
            parts = [title, url];
          }
        }

        if (parts.length >= 2) {
          const title = parts[0].trim();
          const url = parts[1].trim();
          
          if (title && url) {
            parsedResources.push({ title, url });
          }
        }
      }

      if (parsedResources.length === 0) {
        setImportError(
          'Could not parse any resources. Please use one of these formats:\n' +
          '- JSON array with title and url properties\n' +
          '- CSV format: "Title, URL" (one per line)\n' +
          '- Or simply URLs with optional titles'
        );
        return;
      }

      setResources(prev => [...prev, ...parsedResources]);
      setShowImportModal(false);
      setSuccess(`Successfully imported ${parsedResources.length} resources`);
    } catch (err) {
      setImportError(`Error parsing import data: ${err.message}`);
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <BackButton onClick={handleBack}>
            <FaArrowLeft /> Back
          </BackButton>
          <Title>Manage {formatResourceType(resourceType)} Resources</Title>
          <p>
            {isExam 
              ? `${examName} Exam`
              : (levelId === 'college' 
                  ? `${grade.charAt(0).toUpperCase() + grade.slice(1)} Year` 
                  : `Grade ${grade}`) + ` • ${formatSubject(subject)}`}
          </p>
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

        <ButtonGroup>
          <AddButton onClick={handleAddResource}>
            <FaPlus /> Add Another Resource
          </AddButton>
          
          <ImportButton onClick={openImportModal}>
            <FaFileImport /> Bulk Import
          </ImportButton>
        </ButtonGroup>

        <SaveButton 
          onClick={handleSubmit}
          disabled={isSaving}
        >
          <FaSave />
          {isSaving ? 'Saving...' : 'Save Resources'}
        </SaveButton>
        
        {showImportModal && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={closeImportModal}>
                <FaTimes />
              </CloseButton>
              
              <h2>Bulk Import Resources</h2>
              
              <FileUploadContainer 
                onClick={triggerFileInput}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={isDragging ? 'drag-active' : ''}
              >
                <FaUpload size={24} style={{ color: '#4299e1', marginBottom: '0.5rem' }} />
                <p>Drag & drop a file here or click to browse</p>
                <p style={{ fontSize: '0.9rem', color: '#718096' }}>Supported formats: CSV, TXT, JSON</p>
                <FileInput 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileInputChange} 
                  accept=".csv,.txt,.json"
                />
                {uploadedFile && (
                  <FileInfo>
                    {uploadedFile.name.toLowerCase().endsWith('.csv') ? <FaFileCsv /> : 
                     uploadedFile.name.toLowerCase().endsWith('.json') ? <FaFileImport /> : 
                     <FaFileExcel />}
                    {uploadedFile.name}
                  </FileInfo>
                )}
              </FileUploadContainer>
              
              <OrDivider>OR</OrDivider>
              
              <p>Paste your resources in one of these formats:</p>
              <ul>
                <li>JSON array with title and url properties</li>
                <li>CSV format: "Title, URL" (one per line)</li>
                <li>Tab-separated values: Title[tab]URL</li>
                <li>One URL per line (title will be the same as URL)</li>
              </ul>
              
              {importError && (
                <div style={{ 
                  backgroundColor: '#fff5f5', 
                  color: '#e53e3e', 
                  padding: '1rem', 
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  border: '1px solid #fed7d7',
                  whiteSpace: 'pre-line'
                }}>
                  {importError}
                </div>
              )}
              
              <TextArea 
                value={importText}
                onChange={handleImportTextChange}
                placeholder={'Example formats:\n\n[\n  {"title": "Resource 1", "url": "https://example.com/1"},\n  {"title": "Resource 2", "url": "https://example.com/2"}\n]\n\nOR\n\nResource 1, https://example.com/1\nResource 2, https://example.com/2'}
              />
              
              <ButtonGroup>
                <SaveButton onClick={() => parseImportText()}>
                  <FaFileImport /> Import Resources
                </SaveButton>
                <button 
                  onClick={closeImportModal}
                  style={{ 
                    padding: '0.75rem 1.5rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    background: '#f7fafc',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </ButtonGroup>
            </ModalContent>
          </Modal>
        )}
      </Form>
    </Container>
  );
};

export default AdminAddResource;
