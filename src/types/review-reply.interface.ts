export interface ReviewReply {
  replyId: string;
  parentReviewId: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface CreateReplyPayload {
  parentReviewId: string;
  movieId: number;
  userId: string;
  username: string;
  text: string;
}
