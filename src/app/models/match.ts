// import { Scorecard } from "./scorecard";

export class Match {
  _id: string;
  name?: string;
  scorecardId?: string;
  status?: string;
  scName?: string;
  datePlayed?: string;
  dateFlag?: boolean;
  memberIds?: string[];
  // playerNames: string[];
  // lineUpIds: string[];
  // playersHCap: string[];
  // scoreIds: string[];
  players?: number;
  lineUps?: any;
  created?: string;
  user?: string;


  constructor() {
    this._id = ''
    // this.name = ''
    // this.datePlayed = '';
    this.memberIds = [];
    // this.playerNames = [];
    // this.lineUpIds = [];
    // this.playersHCap = [];
    // this.scoreIds = [];
    // this.scorecard = new Scorecard();
  }
}
