export class Score {
  _id: string;
  name: string;
  scorecardId: string;
  lineupIds: string[];
  memberIds: string[];
  partnerIds: string[];
  foursomeIds: string[];
  score: number;
  handicap: number;
  wonTwoBall: Boolean;
  wonOneBall: Boolean;
  wonIndo: Boolean;
  matchId: string;
  datePlayed: Date;
  user: string;
};
