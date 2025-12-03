import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// =====================
// AVATAR SCHEMA
// =====================
const avatarSchema = new mongoose.Schema({
  public_id: { type: String },
  url: { type: String },
});

// =====================
// SUBSCRIPTION & TRIAL
// =====================
const subscriptionSchema = new mongoose.Schema({
  plan: {
    type: String,
    enum: ['trial', 'monthly', 'quarterly', 'annual'],
    default: 'trial'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: function() {
      if (this.plan === 'trial') {
        const date = new Date();
        date.setDate(date.getDate() + 21); // 21-day trial
        return date;
      }
      return null;
    }
  },
  paymentId: String,
  autoRenew: {
    type: Boolean,
    default: false
  }
}, { _id: false });

// =====================
// USER SCHEMA
// =====================
const userSchema = new mongoose.Schema(
  {
    // =====================
    // BASIC USER INFO
    // =====================
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    avatar: avatarSchema,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    phone: {
      type: String,
      trim: true,
    },

    // =====================
    // SUBSCRIPTION & TRIAL
    // =====================
   subscription: {
  type: subscriptionSchema,
  default: () => ({ plan: "trial", isActive: true })
},
    // =====================
    // ENGAGEMENT & STREAK SYSTEM
    // =====================
    lastMeetingDate: {
      type: Date,
      default: null,
    },

    totalMeetingsAttended: {
      type: Number,
      default: 0,
    },

    currentStreak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    dailyEngagementLog: [
      {
        type: Date,
      },
    ],

    // =====================
    // ENHANCED TREE GROWTH
    // =====================
    currentTree: {
      treeId: {
        type: String,
        default: () => crypto.randomUUID(),
      },
      stage: {
        type: String,
        enum: ["seed", "sprout", "baby", "growing", "full"],
        default: "seed",
      },
      daysGrown: {
        type: Number,
        default: 0,
        min: 0,
        max: 5, // Number of stages
      },
      consecutiveDays: {
        type: Number,
        default: 0,
      },
      lastWatered: {
        type: Date,
        default: null,
      },
      startedAt: {
        type: Date,
        default: Date.now,
      },
      isReadyForForest: {
        type: Boolean,
        default: false
      }
    },

    // Permanent Forest (Completed Trees)
    forest: [
      {
        treeId: String,
        completedAt: Date,
        totalDays: {
          type: Number,
          default: 5,
        },
        lifecycle: {
          type: String,
          default: "completed",
        },
      },
    ],

    // =====================
    // SOUL ANIMATION SYSTEM
    // =====================
    soulPeacePoints: {
      type: Number,
      default: 0,
    },

    lastSoulUpdate: {
      type: Date,
      default: null,
    },

    // =====================
    // SECURITY FIELDS
    // =====================
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// =====================
// PASSWORD HASHING
// =====================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// =====================
// SET TRIAL DATES FOR NEW USERS
// =====================
userSchema.pre('save', function(next) {
  if (this.isNew && this.subscription.plan === 'trial' && !this.subscription.startDate) {
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 21);
    this.subscription.endDate = trialEnd;
    this.subscription.startDate = new Date();
  }
  next();
});

// =====================
// UPDATE TREE STAGE
// =====================
userSchema.pre('save', function(next) {
  if (this.isModified('currentTree.daysGrown')) {
    const stages = ["seed", "sprout", "baby", "growing", "full"];
    this.currentTree.stage = stages[this.currentTree.daysGrown] || "seed";
    this.currentTree.isReadyForForest = this.currentTree.daysGrown >= stages.length - 1;
  }
  next();
});

// =====================
// COMPARE PASSWORD
// =====================
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// =====================
// RESET PASSWORD TOKEN
// =====================
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// =====================
// CHECK TRIAL STATUS
// =====================
userSchema.methods.isTrialActive = function() {
  if (this.subscription.plan !== 'trial') return false;
  return new Date() <= new Date(this.subscription.endDate);
};

// =====================
// CHECK SUBSCRIPTION STATUS
// =====================
userSchema.methods.hasActiveSubscription = function() {
  if (this.subscription.plan === 'trial') {
    return this.isTrialActive();
  }
  return this.subscription.isActive && new Date() <= new Date(this.subscription.endDate);
};

// =====================
// UPDATE USER STREAK
// =====================
userSchema.methods.updateStreak = async function() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  if (!this.lastMeetingDate || 
      formatDate(new Date(this.lastMeetingDate)) === formatDate(yesterday)) {
    this.currentStreak += 1;
    
    if (this.currentStreak > this.longestStreak) {
      this.longestStreak = this.currentStreak;
    }
  } 
  else if (formatDate(new Date(this.lastMeetingDate)) !== formatDate(today)) {
    this.currentStreak = 1;
  }

  this.lastMeetingDate = today;
  this.totalMeetingsAttended += 1;
  this.dailyEngagementLog.push(today);
  
  await this.save();
};

// =====================
// UPDATE TREE GROWTH
// =====================
userSchema.methods.updateTreeGrowth = async function() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  const Attendance = mongoose.model('Attendance');
  const yesterdayAttendance = await Attendance.findOne({
    user: this._id,
    date: formatDate(yesterday)
  });

  if (!yesterdayAttendance && this.currentTree.consecutiveDays > 0) {
    this.currentTree.consecutiveDays = 0;
    this.currentTree.daysGrown = 0;
    this.currentTree.stage = "seed";
    await this.save();
    return;
  }

  this.currentTree.consecutiveDays += 1;
  const stages = ["seed", "sprout", "baby", "growing", "full"];
  
  if (this.currentTree.consecutiveDays % 5 === 0 && 
      this.currentTree.daysGrown < stages.length - 1) {
    this.currentTree.daysGrown += 1;
    this.currentTree.stage = stages[this.currentTree.daysGrown];
    
    if (this.currentTree.daysGrown === stages.length - 1) {
      this.currentTree.isReadyForForest = true;
    }
  }

  this.currentTree.lastWatered = today;
  await this.save();
};

// =====================
// MOVE TREE TO FOREST
// =====================
userSchema.methods.moveToForest = async function() {
  if (!this.currentTree.isReadyForForest) {
    throw new Error('Tree is not ready to be moved to forest');
  }

  this.forest.push({
    treeId: this.currentTree.treeId,
    completedAt: new Date(),
    totalDays: this.currentTree.consecutiveDays,
    lifecycle: 'completed'
  });

  this.currentTree = {
    treeId: crypto.randomUUID(),
    stage: "seed",
    daysGrown: 0,
    consecutiveDays: 0,
    lastWatered: null,
    startedAt: new Date(),
    isReadyForForest: false
  };

  await this.save();
};

// =====================
// GET TREE STAGE
// =====================
userSchema.methods.getTreeStage = function () {
  const stages = ["seed", "sprout", "baby", "growing", "full"];
  return stages[this.currentTree.daysGrown] || "seed";
};

const User = mongoose.model("User", userSchema);

export default User;