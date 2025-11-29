import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDebounce } from 'use-debounce';
import { FaSchool, FaGraduationCap, FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaSearch, FaExternalLinkAlt, FaFolderOpen, FaPlay, FaArrowRight, FaClock, FaTimes } from 'react-icons/fa';
import { getRecentResources } from '../api/resourcesApi';
import { searchResources } from '../api/resourcesApi';

// Image paths
const imagePaths = {
  elementary: '/elementry.png',
  middle: '/middleschool.png',
  high: '/highschool.png',
  college: '/college.png',
  exams: '/SATGRE.png'
};

// Modal styles
const ModalOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '1rem',
});

const ModalContent = styled('div')({
  backgroundColor: 'white',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '800px',
  maxHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  overflow: 'hidden',
});

const ModalHeader = styled('div')({
  padding: '1.25rem 1.5rem',
  borderBottom: '1px solid #e2e8f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& h3': {
    margin: 0,
    fontSize: '1.25rem',
    color: '#2d3748',
  },
});

const CloseButton = styled('button')({
  background: 'none',
  border: 'none',
  fontSize: '1.25rem',
  color: '#718096',
  cursor: 'pointer',
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#f7fafc',
    color: '#4a5568',
  },
});

const ModalBody = styled('div')({
  padding: '1.5rem',
  overflowY: 'auto',
  flex: 1,
});

const ResourceList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const ResourceItem = styled('div')({
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '1rem',
  border: '1px solid #e2e8f0',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#cbd5e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
});

const ResourceTitle = styled('h4')({
  margin: '0 0 0.5rem 0',
  color: '#2d3748',
  fontSize: '1rem',
  fontWeight: 600,
});

const ResourceMeta = styled('div')({
  display: 'flex',
  gap: '0.75rem',
  fontSize: '0.875rem',
  color: '#718096',
  marginBottom: '0.75rem',
  flexWrap: 'wrap',
});

const ResourceActions = styled('div')({
  display: 'flex',
  gap: '0.75rem',
});

const ViewButton = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: '#4299e1',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '0.4rem 0.8rem',
  fontSize: '0.875rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#3182ce',
  },
});

const GoToSectionButton = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: '#edf2f7',
  color: '#4a5568',
  border: 'none',
  borderRadius: '6px',
  padding: '0.4rem 0.8rem',
  fontSize: '0.875rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#e2e8f0',
  },
});

const NoResources = styled('div')({
  textAlign: 'center',
  color: '#718096',
  padding: '2rem',
  fontSize: '1rem',
});

const PageBackground = styled('div')({
  width: '100%',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
  position: 'relative',
  overflow: 'hidden',
  background: 'url("/Hero-background-Section.png") no-repeat center center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 0
  },
  '& > *': {
    position: 'relative',
    zIndex: 1
  },
  '@media (max-width: 768px)': {
    backgroundPosition: 'center center',
  }
});

// Search UI styles
const SearchContainer = styled('div')({
  width: '100%',
  maxWidth: '380px',
  position: 'relative',
  flexShrink: 1,
  '@media (max-width: 968px)': {
    maxWidth: '90%'
  }
});

const SearchInputWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  background: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  border: '1px solid #e2e8f0',
  padding: '0.5rem 0.75rem',
  gap: '0.5rem'
});

const SearchInput = styled('input')({
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  padding: '0.5rem',
  color: '#2d3748'
});

const ResultsPanel = styled('div')({
  position: 'relative',
  background: 'white',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
  marginTop: '0.75rem',
  marginBottom: '1.5rem',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto'
});

const ResultRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #edf2f7',
  gap: '1rem',
  ':last-of-type': { borderBottom: 'none' }
});

const ResultInfo = styled('div')({
  minWidth: 0
});

const ResultTitle = styled('div')({
  color: '#2d3748',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const ResultMeta = styled('div')({
  color: '#718096',
  fontSize: '0.85rem',
  marginTop: '0.25rem'
});

const Actions = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  flexShrink: 0
});

const PrimaryButton = styled('button')({
  background: '#4299e1',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '0.4rem 0.6rem',
  fontSize: '0.9rem',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem'
});

const SecondaryButton = styled('button')({
  background: '#edf2f7',
  color: '#2d3748',
  border: 'none',
  borderRadius: '6px',
  padding: '0.4rem 0.6rem',
  fontSize: '0.9rem',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem'
});

const Container = styled('div')({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '12rem 1rem 4rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 768px)': {
    padding: '8rem 1rem 2rem 1rem'
  }
});

const HeaderRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  width: '100%',
  marginBottom: '1.5rem',
  flexWrap: 'wrap',
  '@media (max-width: 968px)': {
    flexDirection: 'column',
    gap: '1rem'
  }
});

const Title = styled('h1')({
  color: '#1a365d',
  fontSize: '2rem',
  margin: 0,
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  fontWeight: 700,
  letterSpacing: '-0.5px',
  background: 'linear-gradient(45deg, #1a365d, #3182ce)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  '@media (max-width: 968px)': {
    fontSize: '1.8rem'
  },
  '@media (max-width: 480px)': {
    fontSize: '1.5rem'
  }
});

const Subtitle = styled('p')({
  color: '#2d3748',
  fontSize: '1.3rem',
  marginBottom: '3rem',
  textAlign: 'center',
  maxWidth: '700px',
  lineHeight: 1.6,
  fontWeight: 500,
  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
  padding: '0 1rem',
  '@media (max-width: 768px)': {
    fontSize: '1.1rem',
    marginBottom: '2rem'
  }
});

const LevelsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  width: '100%',
  padding: '1rem',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '0.75rem',
    padding: '0.75rem'
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    padding: '0.5rem'
  }
});

const ContainerWrapper = styled('div')({
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto'
});

const LevelCard = styled('div')(({ isNew, isComingSoon }) => ({
  background: isNew ? 'linear-gradient(135deg, rgba(255, 250, 230, 0.95), rgba(255, 245, 215, 0.95))' : 'rgba(255, 255, 255, 0.9)',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: isNew ? '0 4px 12px rgba(247, 196, 66, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backdropFilter: 'blur(5px)',
  border: isNew ? '1px solid #f7c542' : '1px solid rgba(255, 255, 255, 0.3)',
  position: 'relative',
  opacity: isComingSoon ? 0.6 : 1,
  transform: isComingSoon ? 'scale(0.85)' : 'scale(1)',
  '&:hover': {
    transform: isComingSoon ? 'scale(0.88)' : 'translateY(-4px) scale(1.01)',
    boxShadow: isNew ? '0 8px 20px rgba(247, 196, 66, 0.35)' : '0 8px 20px rgba(0, 0, 0, 0.2)',
    background: isNew
      ? 'linear-gradient(135deg, rgba(255, 248, 230, 0.98), rgba(255, 238, 200, 0.95))'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 249, 255, 0.95))',
    borderColor: isNew ? '#f7c542' : '#63b3ed',
    opacity: isComingSoon ? 0.7 : 1
  }
}));

const NewBadge = styled('div')({
  position: 'absolute',
  top: '12px',
  right: '12px',
  backgroundColor: '#f7c542',
  color: '#7a5c10',
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
});

const ImageContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '140px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
  padding: '1rem',
  transition: 'all 0.3s ease',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '6px',
    transition: 'transform 0.3s ease, filter 0.3s ease',
    filter: 'grayscale(20%) contrast(110%)'
  },
  '&:hover img': {
    transform: 'scale(1.05)',
    filter: 'grayscale(0%) contrast(120%)'
  },
  '@media (max-width: 768px)': {
    height: '120px',
    padding: '0.75rem'
  },
  '@media (max-width: 480px)': {
    height: '100px'
  }
});

const Content = styled('div')({
  padding: '1rem',
  textAlign: 'center',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '80px'
});

const IconContainer = styled('div')({
  fontSize: '1.5rem',
  color: '#4299e1',
  marginBottom: '0.4rem'
});

const LevelTitle = styled('h2')({
  color: '#2d3748',
  fontSize: '1.1rem',
  margin: '0 0 0.3rem 0'
});

const LevelDescription = styled('p')({
  color: '#718096',
  margin: 0,
  fontSize: '0.85rem'
});

const EducationLevelPage = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounced] = useDebounce(q, 300);
  const [recentResources, setRecentResources] = useState([]);
  const [showRecentModal, setShowRecentModal] = useState(false);

  // Extract YouTube ID
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      const host = u.hostname.replace(/^www\./, '');
      if (host === 'youtu.be') {
        const seg = u.pathname.split('/').filter(Boolean);
        return seg[0] || null;
      }
      const v = u.searchParams.get('v');
      if (v) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      if (parts.length >= 2 && ['embed', 'shorts', 'v'].includes(parts[0])) return parts[1];
      return null;
    } catch { return null; }
  };

  // Perform search
  useEffect(() => {
    let active = true;
    if (!debounced || debounced.length < 2) { setResults([]); return; }
    (async () => {
      try {
        setLoading(true);
        const res = await searchResources(debounced);
        if (!active) return;
        setResults(Array.isArray(res) ? res : []);
      } catch {
        if (active) setResults([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [debounced]);

  const educationLevels = [
    {
      id: 'elementary',
      title: 'Elementary School',
      description: 'Grades 1-6',
      image: imagePaths.elementary,
      icon: <FaSchool />,
      grades: Array.from({ length: 6 }, (_, i) => i + 1), // Grades 1-6
      isExam: false,
      isComingSoon: true,
      onClick: () => navigate('/coming-soon')
    },
    {
      id: 'middle',
      title: 'Middle School',
      description: 'Grades 7-8',
      image: imagePaths.middle,
      icon: <FaChalkboardTeacher />,
      grades: [7, 8],
      isExam: false,
      isComingSoon: true,
      onClick: () => navigate('/coming-soon')
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
      isExam: false,
      isComingSoon: true,
      onClick: () => navigate('/coming-soon')
    },
    {
      id: 'exams',
      title: 'Standardized Tests',
      description: 'SAT, GRE, and more',
      image: imagePaths.exams,
      icon: <FaClipboardList />,
      isExam: true
    },
    {
      id: 'upcoming',
      title: 'Additional Online Resource',
      description: 'Khan Academy and Fetena.net',
      image: imagePaths.elementary,
      icon: <FaClock />,
      isExam: false,
      onClick: () => navigate('/additional-resources')
    }
  ];

  // Load recent resources on component mount
  useEffect(() => {
    const loadRecentResources = async () => {
      try {
        const recent = await getRecentResources(5);
        setRecentResources(recent);
      } catch (error) {
        console.error('Error loading recent resources:', error);
      }
    };

    loadRecentResources();
  }, []);

  const handleLevelSelect = (level) => {
    if (level.onClick) {
      level.onClick();
      return;
    }

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

  const openResource = (item) => {
    const videoId = getYouTubeVideoId(item.url);
    if (videoId) {
      navigate(`/watch/youtube/${videoId}`, { state: { title: item.title, sourceUrl: item.url } });
      return;
    }
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  const goToSection = (ctx) => {
    if (ctx?.isExam) {
      navigate(`/content/exams/${ctx.examId}/${ctx.resourceType}`);
    } else {
      navigate(`/content/${ctx.levelId}/${ctx.grade}/${ctx.subject}/${ctx.resourceType}`);
    }
  };

  // Render human-friendly context text for a resource
  const renderContext = (ctx) => {
    if (!ctx) return '';
    if (ctx.isExam) {
      return `Exam: ${String(ctx.examId || '').toUpperCase()} • Type: ${String(ctx.resourceType || '')}`;
    }
    return `Level: ${String(ctx.levelId || '')} • Grade: ${String(ctx.grade || '')} • Subject: ${String(ctx.subject || '')} • Type: ${String(ctx.resourceType || '')}`;
  };

  // Modal component for recent resources
  const RecentResourcesModal = ({ resources, onClose }) => (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h3>Recently Added Resources</h3>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          {resources.length === 0 ? (
            <NoResources>No recent resources found.</NoResources>
          ) : (
            <ResourceList>
              {resources.map((resource, index) => (
                <ResourceItem key={index}>
                  <ResourceTitle>{resource.title}</ResourceTitle>
                  <ResourceMeta>
                    {resource.context && (
                      <span>{renderContext(resource.context)}</span>
                    )}
                    {resource.createdAt && (
                      <span>• Added {new Date(resource.createdAt).toLocaleDateString()}</span>
                    )}
                  </ResourceMeta>
                  <ResourceActions>
                    <ViewButton onClick={() => openResource(resource)}>
                      <FaExternalLinkAlt size={12} /> View
                    </ViewButton>
                    {resource.context && (
                      <GoToSectionButton onClick={() => goToSection(resource.context)}>
                        <FaFolderOpen size={12} /> Go to Section
                      </GoToSectionButton>
                    )}
                  </ResourceActions>
                </ResourceItem>
              ))}
            </ResourceList>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );

  return (
    <PageBackground>
      {showRecentModal && (
        <RecentResourcesModal
          resources={recentResources}
          onClose={() => setShowRecentModal(false)}
        />
      )}
      <Container>
        <HeaderRow>
          <Title>Select Your Education Level</Title>
          <SearchContainer>
            <SearchInputWrapper>
              <FaSearch color="#718096" />
              <SearchInput
                value={q}
                placeholder="Search resources (min 2 characters)..."
                onChange={(e) => setQ(e.target.value)}
              />
            </SearchInputWrapper>
          </SearchContainer>
        </HeaderRow>

        {(q.trim().length >= 2) && (
          <ResultsPanel>
            {loading && (
              <ResultRow><ResultInfo>Searching...</ResultInfo></ResultRow>
            )}
            {!loading && results.length === 0 && (
              <ResultRow><ResultInfo>No results</ResultInfo></ResultRow>
            )}
            {!loading && results.map((r) => (
              <ResultRow key={`${r.context?.isExam ? 'exam' : 'edu'}_${r.id}`}>
                <ResultInfo>
                  <ResultTitle title={r.title}>{r.title}</ResultTitle>
                  <ResultMeta>
                    {r.context?.isExam ? (
                      <>Exam: {String(r.context.examId || '').toUpperCase()} • Type: {String(r.context.resourceType || '')}</>
                    ) : (
                      <>Level: {r.context?.levelId} • Grade: {r.context?.grade} • Subject: {r.context?.subject} • Type: {r.context?.resourceType}</>
                    )}
                  </ResultMeta>
                </ResultInfo>
                <Actions>
                  <PrimaryButton onClick={() => openResource(r)} title="Open resource">
                    <FaPlay /> Open
                  </PrimaryButton>
                  <SecondaryButton onClick={() => goToSection(r.context)} title="View section">
                    <FaFolderOpen /> Section
                  </SecondaryButton>
                  <SecondaryButton onClick={() => window.open(r.url, '_blank', 'noopener,noreferrer')} title={r.url}>
                    <FaExternalLinkAlt /> Link
                  </SecondaryButton>
                </Actions>
              </ResultRow>
            ))}
          </ResultsPanel>
        )}

        <ContainerWrapper>
          <LevelsGrid>
            {educationLevels.map((level) => (
              <LevelCard
                key={level.id}
                isNew={level.isNew}
                isComingSoon={level.isComingSoon}
                onClick={() => handleLevelSelect(level)}
                style={level.isNew ? { backgroundColor: '#f7f7f7', boxShadow: '0 0 10px rgba(0,0,0,0.1)' } : {}}
              >
                {level.isNew && <NewBadge>New</NewBadge>}
                <ImageContainer>
                  <img
                    src={level.isNew ? '/tl-logo.png' : level.image}
                    alt={level.title}
                    style={level.isNew ? { width: '60%', height: '60%', objectFit: 'contain' } : {}}
                  />
                </ImageContainer>
                <Content>
                  <IconContainer>{level.icon}</IconContainer>
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
