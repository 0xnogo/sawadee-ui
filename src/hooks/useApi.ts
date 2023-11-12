import { useToast } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: any | null;
  loading: boolean;
}

const useApi = <T = any>(initialData: T | null = null) => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: initialData,
    error: null,
    loading: false,
  });
  const toast = useToast();

  const fetchData = async (url: string) => {
    setResponse((prevResponse) => ({
      ...prevResponse,
      loading: true,
      error: null,
    }));

    try {
      const axiosResponse: AxiosResponse<T> = await axios.get(url);
      console.log(axiosResponse);
      setResponse({
        data: axiosResponse.data,
        error: null,
        loading: false,
      });
    } catch (error: any) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setResponse({
        data: null,
        error,
        loading: false,
      });
    }
  };

  return { ...response, fetchData };
};

export default useApi;
