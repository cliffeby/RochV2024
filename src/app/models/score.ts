import { Scorecard } from "./scorecard";

export class Score {
         _id: string;
         scoreId: string;
         name: string;
         score: number;
         postedScore: number;
         scores: number[];
         scorecardId: string;
         scorecard?: Scorecard;
         scSlope: number;
         scRating: number;
         lineupIds: string[];
         memberId: string;
         partnerIds: string[];
         foursomeIds: string[];
         handicap: number;
         usgaIndex: number;
         usgaIndexForTodaysScore: number;
         coursePlayerHandicap: number;
         wonTwoBall: Boolean;
         wonOneBall: Boolean;
         wonIndo: Boolean;
         isPaired: Boolean;
         isScored: Boolean;
         matchId: string;
         datePlayed: string;
         user: string;
       }
