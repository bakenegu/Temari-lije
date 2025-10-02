import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  min-height: calc(100vh - 200px);
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
  margin-bottom: 1rem;
  &:hover { background: #3182ce; }
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  margin: 0.5rem 0 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #edf2f7;
`;

const SectionTitle = styled.h2`
  color: #2b6cb0;
  font-size: 1.15rem;
  margin: 0 0 0.5rem 0;
`;

const P = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin: 0.25rem 0 0.5rem;
`;

const List = styled.ul`
  margin: 0.25rem 0 0.5rem 1.25rem;
  color: #2d3748;
`;

const Note = styled.div`
  background: #ebf8ff;
  border: 1px solid #bee3f8;
  color: #2b6cb0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-top: 0.75rem;
`;

const ExamInfoPage = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  // For now we only provide SAT details. You can extend with GRE similarly.
  const id = (examId || '').toLowerCase();
  const isSAT = id === 'sat';
  const isGRE = id === 'gre';

  return (
    <Container>
      <BackButton onClick={goBack}><FaArrowLeft /> Back</BackButton>
      <Title>
        {isSAT ? 'About the SAT' : isGRE ? 'About the GRE' : 'About Exam'}
      </Title>

      {isSAT ? (
        <>
          <Card>
            <SectionTitle>Overview</SectionTitle>
            <P>
              The SAT is a standardized test widely used for college admissions in the United States. It assesses
              readiness for college through Reading, Writing and Language, and Math.
            </P>
          </Card>

          <Card>
            <SectionTitle>Test Sections</SectionTitle>
            <List>
              <li><strong>Math</strong>: 80 minutes, 58 questions</li>
              <li><strong>Evidence-Based Reading</strong>: 65 minutes, 52 questions</li>
              <li><strong>Writing and Language</strong>: 35 minutes, 44 questions</li>
              <li><strong>Optional Essay</strong>: 50 minutes</li>
            </List>
          </Card>

          <Card>
            <SectionTitle>Scoring</SectionTitle>
            <P>
              Total score ranges from 400 to 1600, combining two section scores (200–800 each): Evidence-Based Reading
              and Writing (EBRW) and Math.
            </P>
            <Note>
              Tip: Focus preparation on weak areas and take multiple full-length practice tests under timed conditions.
            </Note>
          </Card>

          <Card>
            <SectionTitle>Test Duration</SectionTitle>
            <P>Approximately 3 hours (3 hours 50 minutes with essay).</P>
          </Card>
        </>
      ) : isGRE ? (
        <>
          <Card>
            <SectionTitle>Overview</SectionTitle>
            <P>
              The GRE (Graduate Record Examination) is a standardized test used for admissions
              into many graduate programs worldwide. It evaluates verbal reasoning, quantitative
              reasoning, and analytical writing skills.
            </P>
          </Card>

          <Card>
            <SectionTitle>Test Sections</SectionTitle>
            <List>
              <li><strong>Analytical Writing</strong>: 2 tasks (Issue and Argument), 60 minutes</li>
              <li><strong>Verbal Reasoning</strong>: 2 sections, ~20 questions each, ~30 minutes per section</li>
              <li><strong>Quantitative Reasoning</strong>: 2 sections, ~20 questions each, ~35 minutes per section</li>
              <li><strong>Unscored/Research</strong>: May be included and not identified</li>
            </List>
          </Card>

          <Card>
            <SectionTitle>Scoring</SectionTitle>
            <P>
              Verbal and Quantitative sections are scored on a 130–170 scale (1-point increments),
              while Analytical Writing is scored on a 0–6 scale (half-point increments).
            </P>
            <Note>
              Tip: Build vocabulary for Verbal, master data interpretation for Quant, and practice
              structuring essays for Analytical Writing.
            </Note>
          </Card>

          <Card>
            <SectionTitle>Test Duration</SectionTitle>
            <P>Approximately 3 hours 45 minutes, including a short break.</P>
          </Card>
        </>
      ) : (
        <Card>
          <P>Information for this exam will be added soon.</P>
        </Card>
      )}
    </Container>
  );
};

export default ExamInfoPage;
