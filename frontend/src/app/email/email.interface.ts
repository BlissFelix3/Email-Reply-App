export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  replies: { reply: string; replyUserId: string }[];
}
