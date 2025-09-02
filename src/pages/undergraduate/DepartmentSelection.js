import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaLaptop, FaCalculator, FaChartLine, FaMoneyBillWave, FaCogs } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1.2rem;
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const DepartmentCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const DepartmentIcon = styled.div`
  font-size: 3rem;
  color: #4299e1;
  margin-bottom: 1rem;
`;

const DepartmentName = styled.h2`
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const DepartmentDescription = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
`;

const departments = [
  {
    id: 'computer-science',
    name: 'Computer Science',
    description: 'Explore programming, algorithms, and software development',
    icon: <FaLaptop />
  },
  {
    id: 'accounting',
    name: 'Accounting',
    description: 'Study financial reporting, auditing, and taxation',
    icon: <FaCalculator />
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Learn about market research, branding, and digital marketing',
    icon: <FaChartLine />
  },
  {
    id: 'economics',
    name: 'Economics',
    description: 'Study economic theory, policy, and analysis',
    icon: <FaMoneyBillWave />
  },
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Explore various engineering disciplines and applications',
    icon: <FaCogs />
  }
];

const DepartmentSelection = () => {
  const navigate = useNavigate();

  const handleDepartmentClick = (departmentId) => {
    navigate(`/undergraduate/${departmentId}/resources`);
  };

  return (
    <Container>
      <Header>
        <Title>Undergraduate Programs</Title>
        <Subtitle>Select your department to access resources</Subtitle>
      </Header>
      
      <DepartmentGrid>
        {departments.map((dept) => (
          <DepartmentCard 
            key={dept.id}
            onClick={() => handleDepartmentClick(dept.id)}
            aria-label={`${dept.name} department`}
          >
            <DepartmentIcon>{dept.icon}</DepartmentIcon>
            <DepartmentName>{dept.name}</DepartmentName>
            <DepartmentDescription>{dept.description}</DepartmentDescription>
          </DepartmentCard>
        ))}
      </DepartmentGrid>
    </Container>
  );
};

export default DepartmentSelection;
