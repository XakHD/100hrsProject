import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { axiosInstance } from "./axios";
import { IDataContextProvider } from '@refinedev/core/dist/interfaces';

// Initialization of Supabase client
const supabaseUrl = 'https://bprlhfkwzgwibsmgjfgr.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwcmxoZmt3emd3aWJzbWdqZmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTIwMjIsImV4cCI6MjAyMjQ2ODAyMn0.mjfiMtAoVV3fZsjAG7EpfvNCPgCKCdhJZWJ6SmfKST8'; // Replace with your Supabase Key
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Data provider functions for supabase
const getList = async (resource: string) => {
  const { data, error } = await supabase.from(resource).select('*');
  if (error) throw error;
  return data;
};

const getOne = async (resource: string, params: { id: string | number }) => {
  const { data, error } = await supabase.from(resource).select('*').eq('id', params.id).single();
  if (error) throw error;
  return data;
};
 // ... Implement other CRUD methods (create, update, delete) using Supabase client ...

// Custom dataProvider for supabase
export const dataProvider = {
  getList,
  getOne,
  // ... Other CRUD methods
};



// Define a live provider for Supabase, if real-time functionality is needed
export const liveProvider = {
  subscribe: (resource: string, callback: (message: any) => void) => {
    const subscription = supabase
      .from(resource)
      .on('*', payload => {
        callback(payload);
      })
      .subscribe();

    // Return unsubscribe function
    return () => subscription.unsubscribe();
  },
  // ... Other real-time methods as needed
};

export const supabaseDataProvider = dataProvider;
export const supabaseLiveProvider = liveProvider;

// Note: Remove or comment out any GraphQL or WebSocket related code
// This includes the client initialization for GraphQL and wsClient







// import graphqlDataProvider, {
//   GraphQLClient,
//   liveProvider as graphqlLiveProvider,
// } from "@refinedev/nestjs-query";

// import { createClient } from "graphql-ws";

// import { axiosInstance } from "./axios";

// export const API_BASE_URL = "https://api.crm.refine.dev";
// export const API_URL = API_BASE_URL + "/graphql";
// export const WS_URL = "wss://api.crm.refine.dev/graphql";

// export const client = new GraphQLClient(API_URL, {
//   fetch: async (url: string, options: any) => {
//       try {
//           const response = await axiosInstance.request({
//               data: options.body,
//               url,
//               ...options,
//           });

//           return { ...response, data: response.data };
//       } catch (error: any) {
//           const messages = error
//               ?.map((error: any) => error?.message)
//               ?.join("");
//           const code = error?.[0]?.extensions?.code;

//           return Promise.reject({
//               message: messages || JSON.stringify(error),
//               statusCode: code || 500,
//           });
//       }
//   },
// });

// export const wsClient = createClient({
//   url: WS_URL,
//   connectionParams: () => ({
//       headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//   }),
// });

// export const dataProvider = graphqlDataProvider(client);

// export const liveProvider = graphqlLiveProvider(wsClient);



