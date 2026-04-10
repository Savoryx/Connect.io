import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,       // prevent duplicate accounts
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      default: null,      // don't default to "now" — it makes no sense for a birthday
    },
    gender: {
      type: String,
      default: 'Not Selected',
    },
    image: {
      type: String,
      default: '',        // store a URL or base64 string; empty = use a UI placeholder
    },
    phoneNumber: {
      type: String,
      default: '',
      validate: {
        validator: (v) => v === '' || /^[0-9]{10}$/.test(v),
        message: (props) => `${props.value} is not a valid 10-digit phone number!`,
      },
    },
  },
  {
    timestamps: true,   // adds createdAt + updatedAt automatically (replaces manual `date`/`time`)
  }
);

// Prevent model recompilation error in dev/watch mode
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;