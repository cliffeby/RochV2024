export class Member {
  _id: string;
  firstName: string;
  lastName: string;
  usgaIndex: number;
  usgaIndexForTodaysScore: number;
  lastDatePlayed: string;
  email: string;
  // isPlaying: boolean;
  created: string;
  user: string;
  // scoreId: string;
  fullName: string;
  scorecardId: string;
  scorecardsId: string[];
  isPlaying: boolean;
}
export class Team {
  playerA: Member;
  playerB: Member;
  combinedIndex: number;
}
export class LineUps {
  teamA: Team;
  teamB: Team;
  teamC: Team;
  teamD: Team;
  lineUpSD: number;
}
export class Foursome {
  partnerIds: string[];
  foursomeIds: string[];
  memberId: string;
  _id: string;  //Score _id
}
