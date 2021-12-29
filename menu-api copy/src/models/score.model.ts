import mongoose, { Schema, Model, Document } from 'mongoose';

type ScoreDocument = Document & {
  name: string;
  scorecardId: string;
  lineupIds: string[];
  memberId: string;
  partnerIds: string[];
  foursomeIds: string[];
  score: number;
  scoreId: string;
  usgaIndex: number;
  coursePlayerHandicap: number;
  wonTwoBall: Boolean;
  wonOneBall: Boolean;
  wonIndo: Boolean;
  matchId: string;
  datePlayed: Date;
  user: string;
};

type ScoreInput = {
  name: ScoreDocument['name'];
  scorecardId: ScoreDocument['scorecardId'];
  lineupIds: ScoreDocument['lineupIds'];
  memberId: ScoreDocument['memberId'];
  partnerIds: ScoreDocument['partnerIds'];
  foursomeIds: ScoreDocument['foursomeIds'];
  score: ScoreDocument['score'];
  scoreId: ScoreDocument['scoreId'];
  usgaIndex: ScoreDocument['usgaIndex'];
  coursePlayerHandicap: ScoreDocument['coursePlayerHandicap'];
  wonTwoBall: ScoreDocument['wonTwoBall'];
  wonOneBall: ScoreDocument['wonOneBall'];
  wonIndo: ScoreDocument['wonIndo'];
  matchId: ScoreDocument['matchId'];
  datePlayed: ScoreDocument['datePlayed'];
  user: ScoreDocument['user'];
};

const ScoreSchema = new Schema(
  {
    name: String,
    usgaIndex: Number,
    coursePlayerHandicap: Number,
    score: Number,
    // scoreId: String,
    wonTwoBall: Boolean,
    wonOneBall: Boolean,
    wonIndo: Boolean,
    matchId: {
      type: Schema.Types.ObjectId,
      ref: 'Match',
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
    },
    scorecardId: {
      type: Schema.Types.ObjectId,
      ref: 'Scorecard',
    },
    datePlayed: Date,
    foursomeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    partnerIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    user: {
      type: String,
    },
  },
  {
    collection: 'scores',
    timestamps: true,
  }
);

ScoreSchema.virtual('scoreId').get(function () { const scoreId = "llll"; return scoreId; });



const Score: Model<ScoreDocument> = mongoose.model<ScoreDocument>(
  'Score',
  ScoreSchema
);
export { Score, ScoreInput, ScoreDocument };
