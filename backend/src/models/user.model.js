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
    enum: ['trial', 'monthly', 'quarterly', 'annual', 'expired'],
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
        enum: ["Seedling", "Sprout", "Baby Plant", "Plant", "Tree"],
        default: "Seedling",
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
          default: "Tree",
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
    // OTP for password reset
    passwordResetOTP: String,
    passwordResetExpires: Date,
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
  if (this.isModified('currentTree.consecutiveDays')) {
    const stages = ["Seedling", "Sprout", "Baby Plant", "Plant", "Tree"];
    this.currentTree.stage = stages[Math.min(this.currentTree.consecutiveDays - 1, stages.length - 1)] || "Seedling";
    this.currentTree.isReadyForForest = this.currentTree.consecutiveDays >= 5;
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
// PASSWORD RESET OTP METHODS
// =====================
userSchema.methods.setPasswordResetOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  this.passwordResetOTP = otp;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return otp;
};

userSchema.methods.verifyPasswordResetOTP = function (enteredOTP) {
  // Check if OTP exists and is not expired
  if (!this.passwordResetOTP || !this.passwordResetExpires) {
    return false;
  }
  
  // Check if OTP has expired
  if (Date.now() > this.passwordResetExpires) {
    return false;
  }
  
  // Check if OTP matches
  return this.passwordResetOTP === enteredOTP;
};

userSchema.methods.clearPasswordResetOTP = function () {
  this.passwordResetOTP = undefined;
  this.passwordResetExpires = undefined;
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
// CHECK AND UPDATE EXPIRED PLAN
// =====================
userSchema.methods.checkAndUpdateExpiredPlan = async function() {
  const now = new Date();
  const endDate = new Date(this.subscription.endDate);
  
  // Check if plan is expired and not already marked as expired
  if (now > endDate && this.subscription.plan !== 'expired') {
    // Store previous plan before marking as expired
    const previousPlan = this.subscription.plan;
    
    // Update subscription to expired
    this.subscription.plan = 'expired';
    this.subscription.isActive = false;
    
    // Save the updated subscription
    await this.save();
    
    return {
      wasExpired: true,
      previousPlan: previousPlan,
      expiredAt: endDate
    };
  }
  
  return {
    wasExpired: false,
    currentPlan: this.subscription.plan,
    endDate: endDate
  };
};

// =====================
// GET SUBSCRIPTION STATUS DETAILS
// =====================
userSchema.methods.getSubscriptionStatus = function() {
  const now = new Date();
  const endDate = new Date(this.subscription.endDate);
  const isExpired = now > endDate;
  
  return {
    plan: this.subscription.plan,
    isActive: this.subscription.isActive,
    isExpired: isExpired,
    startDate: this.subscription.startDate,
    endDate: this.subscription.endDate,
    daysRemaining: isExpired ? 0 : Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)),
    autoRenew: this.subscription.autoRenew
  };
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
  try {
    // 1. Check if already watered/grown today to prevent abuse
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (this.currentTree.lastWatered) {
      const lastWatered = new Date(this.currentTree.lastWatered);
      lastWatered.setHours(0, 0, 0, 0);
      if (lastWatered.getTime() === today.getTime()) {
        return false; // Already updated today
      }
    }

    // 2. Increment consecutive days
    this.currentTree.consecutiveDays = (this.currentTree.consecutiveDays || 0) + 1;
    
    // 3. Update tree stage based on consecutive days
    if(this.currentTree.consecutiveDays >= 5){
      this.currentTree.stage = "Tree";
      this.currentTree.isReadyForForest = true;
    }
    else if (this.currentTree.consecutiveDays === 4) {
      this.currentTree.stage = "Plant";
    } else if (this.currentTree.consecutiveDays === 3) {
      this.currentTree.stage = "Baby Plant";
    } else if (this.currentTree.consecutiveDays === 2) {
      this.currentTree.stage = "Sprout";
    } else {
      this.currentTree.stage = "Seedling";
    }
    
    // 4. Update last watered time
    this.currentTree.lastWatered = new Date();
    await this.save();
    return true;
  } catch (error) {
    console.error('Error updating tree growth:', error);
    throw error;
  }
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
    lifecycle: 'Tree'
  });

  this.currentTree = {
    treeId: crypto.randomUUID(),
    stage: "Seedling",
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
  const stages = ["Seedling", "Sprout", "Baby Plant", "Plant", "Tree"];
   const stageIndex = Math.min(this.currentTree.daysGrown, stages.length - 1);
  return stages[stageIndex] || "Seedling";
};

const User = mongoose.model("User", userSchema);

export default User;