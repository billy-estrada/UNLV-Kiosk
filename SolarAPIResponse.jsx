import { useEffect, useState } from "react";
import axios from "axios";
import { usePapaParse } from "react-papaparse";
import { SolarAPI } from "../apiConfig.jsx";

/* This is a void function that returns the SolarAPI response 
as an object and passes it to a higher state to be used in the 
Solar Widgets */
export const SolarAPIResponse = () => {
  const [response, setResponse] = useState(null);
  const [parsedResponse, setParsedResponse] = useState(null);
  const { readString } = usePapaParse();

  // fetch response from url
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(SolarAPI);
      console.log("Data fetched", response.data);
      setResponse(response.data);
    };

    fetchData();
  }, []);

  // convert csv string from 'response' to an object
  useEffect(() => {
    if (response) handleReadString(readString, response, setParsedResponse);
  }, [response, readString]);

  console.log(parsedResponse);
};

const handleReadString = (readString, csvString, setParsedResponse) => {
  // papa parse: read string(csvString) & convert to object
  readString(csvString, {
    worker: true,
    complete: (results) => {
      setParsedResponse(results);
      console.log(results);
    },
  });
};

export default SolarAPIResponse;
