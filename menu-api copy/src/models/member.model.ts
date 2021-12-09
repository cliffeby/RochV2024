import mongoose, { Schema, Model, Document, SchemaType } from 'mongoose';

type MemberDocument = Document & {
  firstName: string;
  lastName: string | null;
  usgaIndex: number;
  user: string;
  email: string;
};

type MemberInput = {
  firstName: MemberDocument['firstName'];
  lastName: MemberDocument['lastName'];
  usgaIndex: MemberDocument['usgaIndex'];
  user: MemberDocument['user'];
  email: MemberDocument['email'];
};

const MemberSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
      unique: false,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
      unique: false,
    },
    usgaIndex: {
      type: Schema.Types.Number,
      required: false,
      unique: false,
    },
    email: {
      type: Schema.Types.String,
      required: false,
      unique: false,
    },
    user: {
      type: Schema.Types.String,
      required: false,
      unique: false,
    },
  },
  {
    collection: 'members',
    timestamps: true,
  }
);
// Duplicate the ID field.
//  This provides a workaround for the _id collision with the Scores collection in Member-Block
MemberSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id; // _id is not defined until execution
});

// Ensure virtual fields are serialised.
MemberSchema.set('toJSON', {
  virtuals: true,
});

const Member: Model<MemberDocument> = mongoose.model<MemberDocument>(
  'Member',
  MemberSchema
);

export { Member, MemberInput, MemberDocument };
