import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "YearlyStats",
    "ResultStats",
    "MoveAccuracy",
    "OpponentEloResults",
    "TerminationByResult",
  ],
  endpoints: (build) => ({
    getYearlyStats: build.query({
      query: () => "games/yearlystats",
      providesTags: ["YearlyStats"],
    }),
    getResultStats: build.query({
      query: () => "games/resultstats",
      providesTags: ["ResultStats"],
    }),
    getMoveAccuracy: build.query({
      query: (type) => `games/moveaccuracy/${type}`,
      providesTags: ["MoveAccuracy"],
    }),
    getOpponentEloResults: build.query({
      query: () => "games/opponenteloresults",
      providesTags: ["OpponentEloResults"],
    }),
    getTerminationByResult: build.query({
      query: (result) => `games/terminationbyresult/${result}`,
      providesTags: ["TerminationByResult"],
    }),
  }),
});

export const {
  useGetYearlyStatsQuery,
  useGetResultStatsQuery,
  useGetMoveAccuracyQuery,
  useGetOpponentEloResultsQuery,
  useGetTerminationByResultQuery,
} = api;
