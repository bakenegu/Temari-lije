import React from 'react';
import styled from '@emotion/styled';
import { FaGlobe, FaGraduationCap, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
    }
});

const Container = styled('div')({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '8rem 1rem 4rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width: 768px)': {
        padding: '6rem 1rem 2rem 1rem'
    }
});

const Header = styled('div')({
    textAlign: 'center',
    marginBottom: '4rem',
    position: 'relative',
    width: '100%'
});

const BackButton = styled('button')({
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: '#4a5568',
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'translateY(-50%) scale(1.1)',
        color: '#2d3748',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    '@media (max-width: 768px)': {
        position: 'static',
        transform: 'none',
        marginBottom: '1rem',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    }
});

const Title = styled('h1')({
    color: '#1a365d',
    fontSize: '2.5rem',
    margin: 0,
    fontWeight: 700,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
        fontSize: '2rem'
    }
});

const Subtitle = styled('p')({
    color: '#4a5568',
    fontSize: '1.2rem',
    marginTop: '1rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto'
});

const CardsGrid = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '900px',
    justifyContent: 'center'
});

const ResourceCard = styled('a')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
    }
});

const IconWrapper = styled('div')(({ color }) => ({
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: `${color}15`, // 15 is hex opacity
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    transition: 'all 0.3s ease',
    [`${ResourceCard}:hover &`]: {
        transform: 'scale(1.1)',
        backgroundColor: `${color}25`
    }
}));

const CardTitle = styled('h2')({
    color: '#2d3748',
    fontSize: '1.5rem',
    margin: '0 0 0.5rem 0',
    fontWeight: 600
});

const CardDescription = styled('p')({
    color: '#718096',
    textAlign: 'center',
    margin: 0,
    lineHeight: 1.6
});

const AdditionalResourcesPage = () => {
    const navigate = useNavigate();

    const resources = [
        {
            title: 'Khan Academy',
            description: 'A non-profit educational organization creating a set of online tools that help educate students.',
            url: 'https://www.khanacademy.org/',
            icon: <FaGraduationCap />,
            color: '#14bf96' // Khan Academy green-ish
        },
        {
            title: 'Fetena.net',
            description: 'Ethiopian exam preparation and educational resource platform.',
            url: 'https://fetena.net/',
            icon: <FaGlobe />,
            color: '#4299e1' // Blue
        }
    ];

    return (
        <PageBackground>
            <Container>
                <Header>
                    <BackButton onClick={() => navigate('/')} title="Back to Home">
                        <FaArrowLeft />
                    </BackButton>
                    <Title>Additional Resources</Title>
                    <Subtitle>Explore trusted external platforms for further learning and exam preparation.</Subtitle>
                </Header>

                <CardsGrid>
                    {resources.map((resource, index) => (
                        <ResourceCard
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconWrapper color={resource.color}>
                                {resource.icon}
                            </IconWrapper>
                            <CardTitle>{resource.title}</CardTitle>
                            <CardDescription>{resource.description}</CardDescription>
                        </ResourceCard>
                    ))}
                </CardsGrid>
            </Container>
        </PageBackground>
    );
};

export default AdditionalResourcesPage;
