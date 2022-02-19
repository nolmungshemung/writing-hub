import { Session } from 'next-auth';

export interface UserData {
  userId: string;
  userName?: string;
}

export type WritingHubSession = Session & {
  user: {
    // userId, writerId 와 동일
    id: string;
    // userName(필명)
    penName?: string;
  };
};
