import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name must be less than 100 characters'],
    },
    visitedAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

export default mongoose.model('Visitor', visitorSchema);
