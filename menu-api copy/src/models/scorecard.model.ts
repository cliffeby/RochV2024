import mongoose, { Schema, Model, Document } from 'mongoose';

type ScorecardDocument = Document & {
  groupName: string;
  name: string;
  rating: number;
  slope: number;
  parInputString: string;
  hCapInputString: string;
  yardsInputString: string;
  user: string;
};

type ScorecardInput = {
  groupName: ScorecardDocument['groupName'];
  name: ScorecardDocument['name'];
  rating: ScorecardDocument['rating'];
  slope: ScorecardDocument['slope'];
  parInputString: ScorecardDocument['parInputString'];
  hCapInputString: ScorecardDocument['hCapInputString'];
  yardsInputString: ScorecardDocument['yardsInputString'];
  user: ScorecardDocument['user'];
};

const ScorecardSchema = new Schema({
  groupName: {
    type: Schema.Types.String,
    required: false,
    unique: false,
  },
  name: {
    type: Schema.Types.String,
    unique: false,
    required: true,
    // required: 'Please fill Scorecard name',
  },
  rating: {
    type: Schema.Types.Number,
    required: false,
    unique: false,
  },
  slope: {
    type: Schema.Types.Number,
    required: false,
    unique: false,
  },
  parInputString: String,
  pars: [
    {
      type: Schema.Types.Number,
    },
  ],
  hCapInputString: String,
  hCaps: [
    {
      type: Schema.Types.Number,
    },
  ],
  yardsInputString: String,
  yards: [
    {
      type: Schema.Types.Number,
    },
  ],
  user: {
    type: Schema.Types.String,
    required: false,
    unique: false,
  }
},
  {
  collection: 'scorecards',
  timestamps: true,
}
);
ScorecardSchema.virtual('courseTeeName')
  .get(function () {
    //@ts-ignore
    return `${this.groupName} ${this.name}`;
  })
  .set(function (v: string) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const groupName = v.substring(0, v.indexOf(' '));
    const name = v.substring(v.indexOf(' ') + 1);
    //@ts-ignore
    this.set({groupName, name });
  });

  // Ensure virtual fields are serialised.
ScorecardSchema.set('toJSON', {
  virtuals: true,
});

const Scorecard: Model<ScorecardDocument> = mongoose.model<ScorecardDocument>('Scorecard', ScorecardSchema);
export { Scorecard, ScorecardInput, ScorecardDocument };
