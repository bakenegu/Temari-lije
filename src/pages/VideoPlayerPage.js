import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 200px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 1.75rem;
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #3182ce;
  }
`;

const PlayerCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const PlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  border-radius: 8px;
  overflow: hidden;
  background: #000;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

const FooterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
`;

const ExternalLink = styled.a`
  color: #3182ce;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    text-decoration: underline;
  }
`;

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const title = state.title || 'Video Player';
  const sourceUrl = state.sourceUrl || `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </BackButton>
        <div>
          <Title>{title}</Title>
          <div style={{ color: '#718096', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Embedded from YouTube
          </div>
        </div>
      </Header>

      <PlayerCard>
        <PlayerWrapper>
          <Iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </PlayerWrapper>
        <FooterBar>
          <div />
          <ExternalLink href={sourceUrl} target="_blank" rel="noopener noreferrer" title={sourceUrl}>
            Open on YouTube <FaExternalLinkAlt size={12} />
          </ExternalLink>
        </FooterBar>
      </PlayerCard>
    </Container>
  );
};

export default VideoPlayerPage;
