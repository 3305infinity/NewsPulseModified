// // const mongoose = require('mongoose');

// // const PlatformSchema = new mongoose.Schema({
// //   user: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true
// //   },
// //   platformName: {
// //     type: String,
// //     required: true,
// //     enum: ['Codeforces', 'LeetCode', 'CodeChef', 'HackerRank', 'AtCoder', 'HackerEarth', 'GeeksForGeeks', 'CodingNinjas', 'CodeAcademy']
// //   },
// //   handle: {
// //     type: String,
// //     required: true
// //   },
// //   rating: {
// //     type: Number,
// //     default: null
// //   },
// //   rank: {
// //     type: String,
// //     default: null
// //   },
// //   solvedProblems: {
// //     type: Number,
// //     default: 0
// //   },
// //   profileUrl: {
// //     type: String,
// //     default: null
// //   },
// //   lastUpdated: {
// //     type: Date,
// //     default: Date.now
// //   }
// // }, { timestamps: true });

// // // Compound index to ensure a user can only have one handle per platform
// // PlatformSchema.index({ user: 1, platformName: 1 }, { unique: true });

// // module.exports = mongoose.model('Platform', PlatformSchema);
// const mongoose = require('mongoose');

// const PlatformSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   platformName: {
//     type: String,
//     required: true,
//     enum: ['Codeforces', 'LeetCode', 'CodeChef', 'HackerRank', 'AtCoder', 'HackerEarth', 'GeeksForGeeks', 'CodingNinjas', 'CodeAcademy']
//   },
//   handle: { type: String, required: true },
//   rating: { type: Number, default: null },
//   rank: { type: String, default: null },
//   solvedProblems: { type: Number, default: 0 },
//   profileUrl: { type: String, default: null },
//   lastUpdated: { type: Date, default: Date.now }
// }, { timestamps: true });

// PlatformSchema.index({ user: 1, platformName: 1 }, { unique: true });

// module.exports = mongoose.model('Platform', PlatformSchema);




const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platformName: {
    type: String,
    required: true,
    enum: ['Codeforces', 'LeetCode', 'CodeChef', 'HackerRank', 'AtCoder', 'HackerEarth', 'GeeksForGeeks', 'CodingNinjas', 'CodeAcademy']
  },
  handle: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    default: null 
  },
  rank: { 
    type: String, 
    default: null 
  },
  solvedProblems: { 
    type: Number, 
    default: 0 
  },
  profileUrl: { 
    type: String, 
    default: null 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

// Compound index to ensure a user can only have one handle per platform
PlatformSchema.index({ user: 1, platformName: 1 }, { unique: true });

module.exports = mongoose.model('Platform', PlatformSchema);