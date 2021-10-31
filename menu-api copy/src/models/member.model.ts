import mongoose, { Schema, Model, Document } from 'mongoose';

type MemberDocument = Document & {
  firstName: string;
  lastName: string | null;
};

type MemberInput = {
  firstName: MemberDocument['firstName'];
  lastName: MemberDocument['lastName'];
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
  },
  {
    collection: 'members',
    timestamps: true,
  }
);

const Member: Model<MemberDocument> = mongoose.model<MemberDocument>('Member', MemberSchema);

export { Member, MemberInput, MemberDocument };
