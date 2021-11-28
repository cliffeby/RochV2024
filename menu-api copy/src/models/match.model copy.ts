import { Scorecard, ScorecardInput } from "./scorecard.model"

import { Schema, model, Document, Types } from 'mongoose';

// `Parent` represents the object as it is stored in MongoDB
interface ParentMatch {
  lineupIds: string[];
  memberIds: string[];
  datePlayed: Date;
  user: string;
  scorecardId?: Types.ObjectId;
  name?: string;
}
interface ChildMatch {
  scorecardId: string;
}
// `PopulatedParent` represents the possible populated paths
interface PopulatedParentMatch {
  scorecardId: ChildMatch | null;
}
const ParentModelMatch = model<ParentMatch>(
  'ParentMatch',
  new Schema({
    scorecardId: { type: 'ObjectId', ref: 'ChildMatch' },
    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    lineupIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    datePlayed: Date,
    user: {
      type: Schema.Types.String,
      required: false,
      unique: false,
    },
  },
  {
    collection: 'matches',
    timestamps: true,
  }
));

// export interface Match {
//   name: string;
//   scorecardId: Types.ObjectId | Record<string, unknown>;
//   lineupIds: string[];
//   memberIds: string[];
//   datePlayed: Date;
//   user: string;
// };

// interface MatchBaseDocument extends Match, Document {
//   lineupIds: Types.Array<string>;
//   memberIds: Types.Array<string>;
// }

// export interface MatchDocument extends MatchBaseDocument {
//   scorecardId: Scorecard['_id'];
// }

// export interface MatchPopulatedDocument extends MatchBaseDocument {
//   scorecardId: Scorecard;
// }

// type MatchDocument = Document & {
//   name: string;
//   scorecardId: string;
//   lineupIds: string[];
//   memberIds: string[];
//   datePlayed: Date;
//   user: string;
// };

// type MatchModel = {
//   name: MatchDocument['name'];
//   scorecardId: MatchDocument['scorecardId'];
//   lineupIds: MatchDocument['lineupIds'];
//   memberIds: MatchDocument['memberIds'];
//   datePlayed: MatchDocument['datePlayed'];
//   user: MatchDocument['user'];
// };

// const Match: Model<MatchDocument> = mongoose.model<MatchDocument>(
//   'Match',
//   MatchSchema
// );
// export { Match, MatchInput, MatchDocument };
// export default model<MatchDocument, MatchModel>('Match', MatchSchema);


const childSchema: Schema = new Schema({name: ''})
const ChildModel = model<ChildMatch>('Child', childSchema);

export { ParentMatch,ParentModelMatch, ChildModel, ChildMatch, Scorecard, PopulatedParentMatch };
// export default model<MatchDocument, MatchModel>('Match', MatchSchema);
