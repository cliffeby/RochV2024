import { Scorecard } from './scorecard';

export class Score {
         _id: string;
         scoreId: string;
         name: string;
         score: number;
         postedScore: number;
         scores: number[];
         scoresToPost: number[];
         scorecardId: string;
         scorecard?: Scorecard;
         scSlope: number;
         scRating: number;
         scPars: number[];
         scHCaps: number[];
         scYards: number[];
         lineupIds: string[];
         memberId: string;
         partnerIds: string[];
         foursomeIds: string[];
         handicap: number;
         usgaIndex: number;
         usgaIndexForTodaysScore: number;
         coursePlayerHandicap: number;
         wonTwoBall: boolean;
         wonOneBall: boolean;
         wonIndo: boolean;
         isPaired: boolean;
         isScored: boolean;
         matchId: string;
         datePlayed: string;
         user: string;

         constructor() {
          this._id = '';
          this.scores = [];
          this.usgaIndex = 0;
        }         
       }
       export class PlayerScores {
        scr: Score;
        scrArray: Score[];

        constructor() {
          this.scr = new Score();
          this.scrArray = [new Score()];
        }  
       }
