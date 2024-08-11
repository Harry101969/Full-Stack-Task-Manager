import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Ensure the environment variables are logged correctly
console.log("Environment Variables:", import.meta.env);

const API_URI = import.meta.env.VITE_APP_BASE_URL;
console.log(API_URI); // This should print the value of VITE_APP_BASE_URL

const baseQuery = fetchBaseQuery({ baseUrl: API_URI + "/api" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
