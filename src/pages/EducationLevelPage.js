import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaSchool, FaGraduationCap, FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaSearch, FaExternalLinkAlt, FaFolderOpen, FaPlay } from 'react-icons/fa';
import { searchResources } from '../api/resourcesApi';

// Image paths
const imagePaths = {
  elementary: '/elementry.png',
  middle: '/middleschool.png',
  high: '/highschool.png',
  college: '/college.png',
  exams: '/SATGRE.png'
};

const PageBackground = styled('div')({
  width: '100%',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
  position: 'relative',
  overflow: 'hidden',
  background: 'url("/ethbackground.png") no-repeat center center',
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
  maxWidth: '900px',
  margin: '0 auto 1.5rem auto',
  position: 'relative'
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
  overflow: 'hidden'
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
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 768px)': {
    padding: '1rem'
  }
});

const Title = styled('h1')({
  color: '#1a365d',
  fontSize: '3rem',
  marginBottom: '1.5rem',
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  fontWeight: 700,
  letterSpacing: '-0.5px',
  background: 'linear-gradient(45deg, #1a365d, #3182ce)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  paddingBottom: '1rem',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '4px',
    background: 'linear-gradient(90deg, #3182ce, #63b3ed)',
    borderRadius: '2px'
  },
  '@media (max-width: 768px)': {
    fontSize: '2.2rem'
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  width: '100%',
  padding: '1.5rem',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    padding: '1rem'
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
    padding: '0.75rem'
  }
});

const ContainerWrapper = styled('div')({
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto'
});

const LevelCard = styled('div')(() => ({
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 249, 255, 0.95))',
    borderColor: '#63b3ed'
  }
}));

const ImageContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '220px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
  padding: '1.5rem',
  transition: 'all 0.3s ease',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '8px',
    transition: 'transform 0.3s ease, filter 0.3s ease',
    filter: 'grayscale(20%) contrast(110%)'
  },
  '&:hover img': {
    transform: 'scale(1.05)',
    filter: 'grayscale(0%) contrast(120%)'
  },
  '@media (max-width: 768px)': {
    height: '180px',
    padding: '1rem'
  },
  '@media (max-width: 480px)': {
    height: '160px'
  }
});

const Content = styled('div')({
  padding: '1.8rem',
  textAlign: 'center',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '120px' // Ensure minimum height for content
});

const IconContainer = styled('div')({
  fontSize: '2rem',
  color: '#4299e1',
  marginBottom: '0.5rem'
});

const LevelTitle = styled('h2')({
  color: '#2d3748',
  fontSize: '1.5rem',
  margin: '0 0 0.5rem 0'
});

const LevelDescription = styled('p')({
  color: '#718096',
  margin: 0,
  fontSize: '1rem'
});

const EducationLevelPage = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [debounced, setDebounced] = useState('');

  // Debounce query
  useEffect(() => {
    const id = setTimeout(() => setDebounced(q.trim()), 300);
    return () => clearTimeout(id);
  }, [q]);

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
      isExam: false
    },
    {
      id: 'middle',
      title: 'Middle School',
      description: 'Grades 7-8',
      image: imagePaths.middle,
      icon: <FaChalkboardTeacher />,
      grades: [7, 8],
      isExam: false
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
      isExam: false
    },
    {
      id: 'exams',
      title: 'Standardized Tests',
      description: 'SAT, GRE, and more',
      image: imagePaths.exams,
      icon: <FaClipboardList />,
      isExam: true
    }
  ];

  const handleLevelSelect = (level) => {
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

  return (
    <PageBackground>
      <Container>
        <Title>Select Your Education Level</Title>

      {/* Search resources */}
      <SearchContainer>
        <SearchInputWrapper>
          <FaSearch color="#718096" />
          <SearchInput
            value={q}
            placeholder="Search resources (min 2 characters)..."
            onChange={(e) => setQ(e.target.value)}
          />
        </SearchInputWrapper>
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
      </SearchContainer>
      
      <ContainerWrapper>
        <LevelsGrid>
        {educationLevels.map((level) => (
          <LevelCard 
            key={level.id}
            onClick={() => handleLevelSelect(level)}
            aria-label={`Select ${level.title}`}
          >
            {level.image ? (
              <ImageContainer>
                <img src={level.image} alt={level.title} />
              </ImageContainer>
            ) : (
              <IconContainer>
                {level.icon}
              </IconContainer>
            )}
            <Content>
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
