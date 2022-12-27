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
    "GameEndedIn",
    "Geography",
    "GamesByCalendar",
    "AccByCalendar",
    "ResultsByCalendar",
    "PieceCntAcc",
    "CastleStage",
    "CastleType",
    "GameEndStageStats",
    "TotalGames",
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
    getGameEndedIn: build.query({
      query: (color) => `games/gameendedin/${color}`,
      providesTags: ["GameEndedIn"],
    }),
    getGeography: build.query({
      query: () => "geography/geography",
      providesTags: ["Geography"],
    }),
    getGamesByCalendar: build.query({
      query: (qType) => `calendar/games/${qType}`,
      providesTags: ["GamesByCalendar"],
    }),
    getAccByCalendar: build.query({
      query: (qType) => `calendar/accuracy/${qType}`,
      providesTags: ["AccByCalendar"],
    }),
    getResultsByCalendar: build.query({
      query: (qType) => `calendar/results/${qType}`,
      providesTags: ["ResultsByCalendar"],
    }),
    getPieceCntAcc: build.query({
      query: () => "moves/getpiececntacc",
      providesTags: ["PieceCntAcc"],
    }),
    getCastleStage: build.query({
      query: () => "moves/getcastlestage",
      providesTags: ["CastleStage"],
    }),
    getCastleType: build.query({
      query: () => "moves/getcastletype",
      providesTags: ["CastleType"],
    }),
    getGameEndStageStats: build.query({
      query: () => "games/gameendstagestats",
      providesTags: ["GameEndStageStats"],
    }),
    getTotalGames: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/totalgames/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["TotalGames"],
    }),
  }),
});

export const {
  useGetYearlyStatsQuery,
  useGetResultStatsQuery,
  useGetMoveAccuracyQuery,
  useGetOpponentEloResultsQuery,
  useGetTerminationByResultQuery,
  useGetGameEndedInQuery,
  useGetGeographyQuery,
  useGetGamesByCalendarQuery,
  useGetAccByCalendarQuery,
  useGetResultsByCalendarQuery,
  useGetPieceCntAccQuery,
  useGetCastleStageQuery,
  useGetCastleTypeQuery,
  useGetGameEndStageStatsQuery,
  useGetTotalGamesQuery,
} = api;
