import mongoose, { Schema, Model, Document } from 'mongoose';

type MemberDocument = Document & {
  firstName: string;
  lastName: string | null;
  handicap: number;
  user: string;
  email: string;
};

type MemberInput = {
  firstName: MemberDocument['firstName'];
  lastName: MemberDocument['lastName'];
  handicap: MemberDocument['handicap'];
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
    handicap: {
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
    }
  },
  {
    collection: 'members',
    timestamps: true,
  }
);

const Member: Model<MemberDocument> = mongoose.model<MemberDocument>('Member', MemberSchema);

export { Member, MemberInput, MemberDocument };
