
import { Badge, Card, CardBody, CardFooter, CardHeader, Divider } from '@chakra-ui/react';
import React from 'react';

interface ActivityProps {
  title: string;
  location: string;
  description: string;
  type: string;
}

const Activity: React.FC<ActivityProps> = ({ title, description, location, type }) => {
  return (
    <Card maxW='100%'>
      <CardHeader>{title} - {location}</CardHeader>
      <CardBody>{description}</CardBody>
      <Divider />
      <CardFooter>
        <Badge colorScheme="green">{type}</Badge>
      </CardFooter>
    </Card>
  );
};

export default Activity;
