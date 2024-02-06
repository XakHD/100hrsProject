import graphqlDataProvider, {
  GraphQLClient,
  liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";

import { } from "graphql-ws";

import { axiosInstance } from "./axios";
export const API_BASE_URL = "https://api.crm.refine.dev";
export const API_URL = API_BASE_URL + "/graphql";
export const WS_URL = "wss://api.crm.refine.dev/graphql";
import { createClient } from "graphql-ws";

// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// // Initialization of Supabase client (Replace with your actual credentials)
// export const supabaseUrl = 'https://bprlhfkwzgwibsmgjfgr.supabase.co'; // Replace with your Supabase URL
// export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwcmxoZmt3emd3aWJzbWdqZmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTIwMjIsImV4cCI6MjAyMjQ2ODAyMn0.mjfiMtAoVV3fZsjAG7EpfvNCPgCKCdhJZWJ6SmfKST8'; // Replace with your Supabase Key
// // export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// export const supabase = createClient(supabaseUrl, supabaseKey);

export const client = new GraphQLClient(API_URL, {
  fetch: async (url: string, options: any) => {
      try {
          const response = await axiosInstance.request({
              data: options.body,
              url,
              ...options,
          });

          return { ...response, data: response.data };
      } catch (error: any) {
          const messages = error
              ?.map((error: any) => error?.message)
              ?.join("");
          const code = error?.[0]?.extensions?.code;

          return Promise.reject({
              message: messages || JSON.stringify(error),
              statusCode: code || 500,
          });
      }
  },
});

export const wsClient = createClient({
  url: WS_URL,
  connectionParams: () => ({
      headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
  }),
});

export const dataProvider = graphqlDataProvider(client);

export const liveProvider = graphqlLiveProvider(wsClient);



