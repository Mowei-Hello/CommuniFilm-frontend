export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterURL: string;
}

export interface MovieDetail extends Movie {
  release_date: string;
  vote_average: number; 
}