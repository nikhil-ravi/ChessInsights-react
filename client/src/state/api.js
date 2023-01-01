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
      query: ({ username, timeclass, startdate, enddate }) =>
        `games/totalgames/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["TotalGames"],
    }),
    getGamesByResult: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `games/gamesbyresult/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["GamesByResult"],
    }),
    getGamesByYear: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `games/gamesbyyear/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["GamesByYear"],
    }),
    getAccuracyByMonth: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `games/accuracybymonth/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["AccuracyByMonth"],
    }),
    getAccuracyByMove: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `games/accuracybymove/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["AccuracyByMove"],
    }),
    getAccuracyByResult: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `games/accuracybyresult/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["AccuracyByResult"],
    }),
    getResultsByOpponentRating: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `games/resultsbyopponentrating/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["ResultsByOpponentRating"],
    }),
    getGameByTerminationandResults: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `games/gamebyterminationandresults/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["GameByTerminationandResults"],
    }),
    getGamePhases: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `games/gamephases/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["GamePhases"],
    }),
    // MOVES
    getPieceStats: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `moves/getpiecestats/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["PieceStats"],
    }),
    getCastleStages: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `moves/castlestage/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["CastleStages"],
    }),
    getCastleOpponentType: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `moves/castletype/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["CastleOppornentType"],
    }),
    getTimeOfDayStats: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `calendar/todstats/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["TimeOfDayStats"],
    }),
    getDayOfWeekStats: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `calendar/dowstats/${username}/${timeclass}/${startdate}/${enddate}`,
      providesTags: ["DayOfWeekStats"],
    }),
    getGeographyStats: build.query({
      query: ({ username, timeclass, startdate, enddate }) =>
        `geography/geography/${username}/${timeclass}/${startdate}/${enddate}`,
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
