// src/LocationForm.tsx
import { Button, Flex, Input, Spinner, VStack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import useApi from "../hooks/useApi";
import Activity from "./Activity";


interface LocationFormProps {
  // Define any props here if needed
}

interface ActivityResponse {
  activities: {
    name: string,
    location: string,
    description: string,
    type: string,
  }[];
}

function LocationForm(props: LocationFormProps) {
  const [location, setLocation] = useState<string>("");
  const api = useApi<ActivityResponse>();
  const toast = useToast();

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handlePlanButtonClick = () => {
    if (location === "") {
      toast({
        title: "Please enter a location!",
        description: "You must enter a location to plan your trip.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    api.fetchData(`http://127.0.0.1:8000/travel-plan?location=${encodeURIComponent(location)}`);
  };

  return (
      <Flex flexDirection='column' alignItems='center' gap='2'>
        <label htmlFor="location">Where do you want to go?</label>
        <Input
          w ='100%'
          type="text"
          id="location"
          placeholder='Thailand, New-York...' 
          value={location} 
          onChange={handleLocationChange} />
        <Button colorScheme="yellow" onClick={handlePlanButtonClick}>Let's plan ✈️</Button>

        {api.loading && 
          <Spinner color='red.500' />}
        {api.data &&
          <VStack spacing={4} align='stretch'>
            <h2>Activities:</h2>
            {api.data!.activities.map((activity, index) => (
              <Activity key={index} title={activity.name} location={activity.location} description={activity.description} type={activity.type} />
            ))}
          </VStack>
        }
      </Flex>
  );
}

export default LocationForm;
