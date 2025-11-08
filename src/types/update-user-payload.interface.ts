export interface TopMovieInput {
  rank: number; // 1, 2, or 3
  movieId: number;
}

export interface UpdateUserPayload {
  displayName?: string;
  bio?: string;
  topMovies?: TopMovieInput[];
}