export interface FavoriteMovie {
  rank: number; // 1, 2, or 3
  movieId: number;
  title: string;
  posterURL: string;
  releaseDate?: string;
  voteAverage?: number;
  overview?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  profilePictureUrl: string;
  bio?: string;
  topMovies?: FavoriteMovie[];
  createdAt: string;
  updatedAt: string;
}