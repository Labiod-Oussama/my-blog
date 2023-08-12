import mongoose from 'mongoose';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema, Document } = mongoose;
interface IUser extends Document {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Password?: string;
  Role?: string
  generateAuthToken: () => string;
}
const UserSchema = new Schema<IUser>({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String
  },
  Email: {
    type: String,
    unique: true
  },
  Password: {
    type: String,
  },
  Role: {
    type: String,
    default: 'user'
  }
});
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
})
UserSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ _id: this._id }, 'Oussama LD', {
    expiresIn: 3600
  });
  return token;
};
const User = mongoose.model<IUser>('users', UserSchema);

export default User;