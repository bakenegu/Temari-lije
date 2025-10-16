import React from 'react';
import styled from '@emotion/styled';
import { FaLightbulb, FaUsers, FaGlobeAfrica, FaChalkboardTeacher } from 'react-icons/fa';

const PageWrapper = styled('div')({
  minHeight: '100vh',
  backgroundColor: '#f5f7fa',
  padding: '4rem 1rem',
});

const Content = styled('div')({
  maxWidth: '1000px',
  margin: '0 auto',
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 12px 30px rgba(31, 41, 55, 0.12)',
  padding: '3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  '@media (max-width: 768px)': {
    padding: '2rem',
  },
});

const Section = styled('section')({
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gap: '2rem',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    textAlign: 'center',
    gap: '1rem',
  },
});

const IconWrapper = styled('div')({
  width: '110px',
  height: '110px',
  borderRadius: '30px',
  background: 'linear-gradient(135deg, #2b6cb0, #63b3ed)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '2.5rem',
  boxShadow: '0 10px 20px rgba(43, 108, 176, 0.25)',
  '@media (max-width: 768px)': {
    margin: '0 auto',
  },
});

const SectionContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const Title = styled('h1')({
  fontSize: '2.75rem',
  color: '#1a365d',
  marginBottom: '1rem',
  textAlign: 'center',
});

const SectionHeading = styled('h2')({
  fontSize: '1.75rem',
  color: '#2b6cb0',
  margin: 0,
});

const Paragraph = styled('p')({
  margin: 0,
  lineHeight: 1.7,
  color: '#4a5568',
  fontSize: '1.05rem',
});

const Highlight = styled('div')({
  background: 'linear-gradient(135deg, rgba(99, 179, 237, 0.18), rgba(43, 108, 176, 0.12))',
  borderRadius: '14px',
  padding: '2rem',
  textAlign: 'center',
  color: '#1a365d',
  fontSize: '1.2rem',
  fontWeight: 600,
});

const AboutPage = () => {
  return (
    <PageWrapper>
      <Content>
        <div>
          <Title>About Temari Lije</Title>
          <Paragraph>
            Temari Lije is a modern learning companion designed to empower Ethiopian students and educators.
            Our platform centralizes high-quality academic resources, exam preparation materials, and curated
            content that aligns with national curriculum standards.
          </Paragraph>
        </div>

        <Section>
          <IconWrapper>
            <FaLightbulb />
          </IconWrapper>
          <SectionContent>
            <SectionHeading>Our Mission</SectionHeading>
            <Paragraph>
              We aim to make learning accessible, engaging, and effective by blending technology with localized
              educational content. Temari Lije provides students with the tools, guidance, and resources needed to
              excel from primary school through university entrance exams.
            </Paragraph>
          </SectionContent>
        </Section>

        <Section>
          <IconWrapper>
            <FaUsers />
          </IconWrapper>
          <SectionContent>
            <SectionHeading>Who We Serve</SectionHeading>
            <Paragraph>
              The platform supports learners across elementary, middle, and high school levels, as well as
              individuals preparing for international exams like the SAT and GRE. Teachers and guardians can also
              leverage Temari Lije to discover supplemental materials and structured learning paths.
            </Paragraph>
          </SectionContent>
        </Section>

        <Section>
          <IconWrapper>
            <FaGlobeAfrica />
          </IconWrapper>
          <SectionContent>
            <SectionHeading>Ethiopia-first Focus</SectionHeading>
            <Paragraph>
              Temari Lije blends global best practices with localized pedagogy. We celebrate Ethiopian culture and
              educational values while introducing modern, interactive experiences that keep students curious and
              motivated.
            </Paragraph>
          </SectionContent>
        </Section>

        <Section>
          <IconWrapper>
            <FaChalkboardTeacher />
          </IconWrapper>
          <SectionContent>
            <SectionHeading>Learning Without Barriers</SectionHeading>
            <Paragraph>
              From interactive lessons to practice quizzes, Temari Lije offers flexible learning experiences that
              adapt to each student&apos;s pace. Offline-ready materials and mobile-friendly layouts ensure equitable
              access wherever learning happens.
            </Paragraph>
          </SectionContent>
        </Section>

        <Highlight>
          "Temari Lije is more than a resource library. It is a learning journey tailored for Ethiopian students,
          supported by educators and innovators who believe in the power of accessible education."
        </Highlight>
      </Content>
    </PageWrapper>
  );
};

export default AboutPage;
