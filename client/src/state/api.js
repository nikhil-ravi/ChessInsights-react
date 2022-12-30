import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    // SUPA TAGS
    "TotalGames",
    "GamesByResult",
    "GamesByYear",
    "AccuracyByMove",
    "AccuracyByResult",
    "ResultsByOpponentRating",
    "GameByTerminationandResults",
    "GamePhases",
    "PieceStats",
    "CastleStages",
    "CastleOppornentType",
    "TimeOfDayStats",
    "DayOfWeekStats",
    "GeographyStats",
  ],
  endpoints: (build) => ({
    /* SUPA ENDPOINTS */
    // GAMES
    getTotalGames: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/totalgames/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["TotalGames"],
    }),
    getGamesByResult: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/gamesbyresult/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["GamesByResult"],
    }),
    getGamesByYear: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/gamesbyyear/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["GamesByYear"],
    }),
    getAccuracyByMonth: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/accuracybymonth/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["AccuracyByMonth"],
    }),
    getAccuracyByMove: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/accuracybymove/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["AccuracyByMove"],
    }),
    getAccuracyByResult: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/accuracybyresult/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["AccuracyByResult"],
    }),
    getResultsByOpponentRating: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/resultsbyopponentrating/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["ResultsByOpponentRating"],
    }),
    getGameByTerminationandResults: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/gamebyterminationandresults/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["GameByTerminationandResults"],
    }),
    getGamePhases: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `games/gamephases/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["GamePhases"],
    }),
    // MOVES
    getPieceStats: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `moves/getpiecestats/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["PieceStats"],
    }),
    getCastleStages: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `moves/castlestage/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["CastleStages"],
    }),
    getCastleOpponentType: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `moves/castletype/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["CastleOppornentType"],
    }),
    getTimeOfDayStats: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `calendar/todstats/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["TimeOfDayStats"],
    }),
    getDayOfWeekStats: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `calendar/dowstats/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["DayOfWeekStats"],
    }),
    getGeographyStats: build.query({
      query: ({ timeclass, startdate, enddate }) =>
        `geography/geography/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["GeographyStats"],
    }),
  }),
});

export const {
  /* SUPA */
  // Games
  useGetTotalGamesQuery,
  useGetGamesByResultQuery,
  useGetGamesByYearQuery,
  useGetAccuracyByMonthQuery,
  useGetAccuracyByMoveQuery,
  useGetAccuracyByResultQuery,
  useGetResultsByOpponentRatingQuery,
  useGetGameByTerminationandResultsQuery,
  useGetGamePhasesQuery,
  // MOVES
  useGetPieceStatsQuery,
  useGetCastleStagesQuery,
  useGetCastleOpponentTypeQuery,
  // CALENDAR
  useGetTimeOfDayStatsQuery,
  useGetDayOfWeekStatsQuery,
  // GEOGRAPHY
  useGetGeographyStatsQuery,
} = api;
