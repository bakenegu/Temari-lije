import React from 'react';
import styled from '@emotion/styled';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaFacebook, FaTelegramPlane } from 'react-icons/fa';

const PageWrapper = styled('div')({
  minHeight: '100vh',
  backgroundColor: '#f5f7fa',
  padding: '4rem 1rem',
});

const Grid = styled('div')({
  maxWidth: '1100px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '420px 1fr',
  gap: '2.5rem',
  alignItems: 'stretch',
  '@media (max-width: 992px)': {
    gridTemplateColumns: '1fr',
  },
});

const InfoCard = styled('section')({
  background: 'linear-gradient(160deg, #1a365d, #2b6cb0)',
  borderRadius: '18px',
  padding: '2.5rem',
  color: 'white',
  boxShadow: '0 15px 35px rgba(26, 54, 93, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const InfoGroup = styled('div')({
  display: 'flex',
  gap: '1.25rem',
  alignItems: 'flex-start',
});

const IconCircle = styled('div')({
  width: '48px',
  height: '48px',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.3rem',
  flexShrink: 0,
});

const InfoText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
});

const InfoHeading = styled('h3')({
  margin: 0,
  fontSize: '1.1rem',
  fontWeight: 600,
});

const InfoDetail = styled('p')({
  margin: 0,
  lineHeight: 1.6,
  fontSize: '0.95rem',
});

const ContactTitle = styled('h1')({
  fontSize: '2.5rem',
  color: '#1a365d',
  textAlign: 'center',
  marginBottom: '2.5rem',
});

const FormCard = styled('section')({
  backgroundColor: 'white',
  borderRadius: '18px',
  boxShadow: '0 15px 35px rgba(15, 23, 42, 0.12)',
  padding: '3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  '@media (max-width: 768px)': {
    padding: '2rem',
  },
});

const Form = styled('form')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});

const Field = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

const Label = styled('label')({
  fontWeight: 600,
  color: '#1a365d',
});

const Input = styled('input')({
  border: '1px solid #cbd5f5',
  borderRadius: '10px',
  padding: '0.85rem 1rem',
  fontSize: '1rem',
  color: '#2d3748',
  backgroundColor: '#f8fafc',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  ':focus': {
    outline: 'none',
    borderColor: '#3182ce',
    boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)',
  },
});

const TextArea = styled('textarea')({
  gridColumn: '1 / -1',
  minHeight: '160px',
  borderRadius: '10px',
  border: '1px solid #cbd5f5',
  padding: '0.85rem 1rem',
  fontSize: '1rem',
  backgroundColor: '#f8fafc',
  color: '#2d3748',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  ':focus': {
    outline: 'none',
    borderColor: '#3182ce',
    boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)',
  },
});

const SubmitButton = styled('button')({
  gridColumn: 'span 2',
  border: 'none',
  borderRadius: '12px',
  padding: '1rem 1.2rem',
  fontSize: '1.1rem',
  fontWeight: 600,
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #2b6cb0, #63b3ed)',
  color: 'white',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.75rem',
  boxShadow: '0 15px 30px rgba(99, 179, 237, 0.25)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 20px 32px rgba(43, 108, 176, 0.25)',
  },
  '@media (max-width: 768px)': {
    gridColumn: '1 / -1',
  },
});

const SocialRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const SocialLink = styled('a')({
  width: '42px',
  height: '42px',
  borderRadius: '14px',
  background: 'rgba(255, 255, 255, 0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '1.2rem',
  transition: 'background 0.2s ease, transform 0.2s ease',
  ':hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-2px)',
  },
});

const InfoNote = styled('p')({
  margin: 0,
  fontSize: '0.95rem',
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.85)',
});

const ContactPage = () => {
  return (
    <PageWrapper>
      <ContactTitle>Contact Temari Lije</ContactTitle>
      <Grid>
        <InfoCard>
          <div>
            <InfoHeading>Reach Out Anytime</InfoHeading>
            <InfoNote>
              We love hearing from students, parents, and educators. Choose the channel that works best for you
              and we will respond within 1-2 business days.
            </InfoNote>
          </div>

          <InfoGroup>
            <IconCircle>
              <FaEnvelope />
            </IconCircle>
            <InfoText>
              <InfoHeading>Email</InfoHeading>
              <InfoDetail>support@temarilije.com</InfoDetail>
              <InfoDetail>info@temarilije.com</InfoDetail>
            </InfoText>
          </InfoGroup>

          <InfoGroup>
            <IconCircle>
              <FaPhoneAlt />
            </IconCircle>
            <InfoText>
              <InfoHeading>Phone</InfoHeading>
              <InfoDetail>+251 (0) 987-654-321</InfoDetail>
              <InfoDetail>Mon - Fri, 9:00 AM to 6:00 PM EAT</InfoDetail>
            </InfoText>
          </InfoGroup>

          <InfoGroup>
            <IconCircle>
              <FaMapMarkerAlt />
            </IconCircle>
            <InfoText>
              <InfoHeading>Office</InfoHeading>
              <InfoDetail>Bole Sub-City, Woreda 06</InfoDetail>
              <InfoDetail>Addis Ababa, Ethiopia</InfoDetail>
            </InfoText>
          </InfoGroup>

          <InfoGroup>
            <IconCircle>
              <FaClock />
            </IconCircle>
            <InfoText>
              <InfoHeading>Support Hours</InfoHeading>
              <InfoDetail>Monday to Friday: 9 AM - 6 PM</InfoDetail>
              <InfoDetail>Saturday: 10 AM - 2 PM</InfoDetail>
            </InfoText>
          </InfoGroup>

          <SocialRow>
            <SocialLink href="https://facebook.com/temarilije" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="https://t.me/temarilije" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane />
            </SocialLink>
          </SocialRow>
        </InfoCard>

        <FormCard>
          <div>
            <InfoHeading>Send Us a Message</InfoHeading>
            <InfoNote style={{ color: '#4a5568' }}>
              Share your questions, feedback, or collaboration ideas. Our team will get back to you shortly.
            </InfoNote>
          </div>
          <Form>
            <Field>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your name" />
            </Field>
            <Field>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="Optional" />
            </Field>
            <Field>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" type="text" placeholder="How can we help?" />
            </Field>
            <TextArea id="message" name="message" placeholder="Enter your message here..." />
            <SubmitButton type="submit">Send Message</SubmitButton>
          </Form>
        </FormCard>
      </Grid>
    </PageWrapper>
  );
};

export default ContactPage;
