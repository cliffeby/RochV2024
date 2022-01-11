import { Scorecard } from "./scorecard";

export class Match {
  _id: string;
  name: string;
  scorecardId: string;
  // scorecard: Scorecard;
  scName: string;
  datePlayed: string;
  dateFlag: boolean;
  memberIds: string[];
  playerNames: string[];
  lineUpIds: string[];
  // playersHCap: string[];
  // scoreIds: string[];
  players: number;
  created: string;
  user: string;

  constructor() {
    this.memberIds = [];
    this.playerNames = [];
    this.lineUpIds = [];
    // this.playersHCap = [];
    // this.scoreIds = [];
    // this.scorecard = new Scorecard();
  }
}
