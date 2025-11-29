import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowLeft, FaRocket } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 4rem 3rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: #4299e1;
  margin-bottom: 1.5rem;
  display: inline-block;
  padding: 1.5rem;
  background: #ebf8ff;
  border-radius: 50%;
  box-shadow: 0 10px 20px rgba(66, 153, 225, 0.15);
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
  background: linear-gradient(45deg, #2d3748, #4299e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Message = styled.p`
  color: #718096;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`;

const BackButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);

  &:hover {
    background: #3182ce;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(66, 153, 225, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ComingSoonPage = () => {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <Card>
                <IconWrapper>
                    <FaRocket />
                </IconWrapper>
                <Title>Coming Soon</Title>
                <Message>
                    We're working hard to craft an amazing learning experience for this section.
                    Stay tuned for high-quality content tailored just for you!
                </Message>
                <BackButton onClick={() => navigate('/')}>
                    <FaArrowLeft /> Back to Home
                </BackButton>
            </Card>
        </PageContainer>
    );
};

export default ComingSoonPage;
