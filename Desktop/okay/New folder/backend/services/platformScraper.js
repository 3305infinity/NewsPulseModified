// // const axios = require('axios');
// // const cheerio = require('cheerio');

// // // Mock function for LeetCode
// // async function scrapeLeetCode(username) {
// //   try {
// //     // In a real implementation, you would fetch from LeetCode's API or scrape their site
// //     return {
// //       rating: Math.floor(Math.random() * 3000),
// //       rank: `Top ${Math.floor(Math.random() * 20) + 1}%`,
// //       solvedProblems: Math.floor(Math.random() * 1000),
// //       profileUrl: `https://leetcode.com/${username}`
// //     };
// //   } catch (err) {
// //     console.error('Error scraping LeetCode:', err);
// //     return null;
// //   }
// // }

// // // Mock function for Codeforces
// // async function scrapeCodeforces(username) {
// //   try {
// //     // Mock data - in real implementation, use Codeforces API
// //     return {
// //       rating: Math.floor(Math.random() * 3000),
// //       rank: `Candidate Master`,
// //       solvedProblems: Math.floor(Math.random() * 2000),
// //       profileUrl: `https://codeforces.com/profile/${username}`
// //     };
// //   } catch (err) {
// //     console.error('Error scraping Codeforces:', err);
// //     return null;
// //   }
// // }

// // // Add similar functions for other platforms...

// // module.exports = {
// //   scrapePlatform: async (platformName, username) => {
// //     switch (platformName.toLowerCase()) {
// //       case 'leetcode':
// //         return await scrapeLeetCode(username);
// //       case 'codeforces':
// //         return await scrapeCodeforces(username);
// //       // Add cases for other platforms...
// //       default:
// //         return null;
// //     }
// //   },
  
// //   updateAllPlatforms: async (userId) => {
// //     try {
// //       const platforms = await Platform.find({ user: userId });
      
// //       const updatePromises = platforms.map(async platform => {
// //         const data = await module.exports.scrapePlatform(platform.platformName, platform.handle);
// //         if (data) {
// //           platform.rating = data.rating;
// //           platform.rank = data.rank;
// //           platform.solvedProblems = data.solvedProblems;
// //           platform.profileUrl = data.profileUrl;
// //           platform.lastUpdated = new Date();
// //           await platform.save();
// //         }
// //         return platform;
// //       });
      
// //       return await Promise.all(updatePromises);
// //     } catch (err) {
// //       console.error('Error updating platforms:', err);
// //       throw err;
// //     }
// //   }
// // };






// const axios = require('axios');
// const cheerio = require('cheerio');

// // LeetCode scraper using their GraphQL API
// async function scrapeLeetCode(username) {
//   try {
//     const query = {
//       query: `
//         query getUserProfile($username: String!) {
//           matchedUser(username: $username) {
//             username
//             profile {
//               ranking
//               reputation
//             }
//             submitStats {
//               acSubmissionNum {
//                 difficulty
//                 count
//               }
//             }
//           }
//         }
//       `,
//       variables: { username }
//     };

//     const response = await axios.post('https://leetcode.com/graphql', query, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Referer': 'https://leetcode.com'
//       }
//     });

//     const userData = response.data.data.matchedUser;
//     if (!userData) {
//       return null;
//     }

//     // Extract problem difficulties
//     const solvedProblems = userData.submitStats.acSubmissionNum.reduce((acc, diff) => {
//       acc[diff.difficulty.toLowerCase()] = diff.count;
//       return acc;
//     }, { easy: 0, medium: 0, hard: 0 });

//     return {
//       rating: userData.profile.reputation,
//       rank: `#${userData.profile.ranking}`,
//       solvedProblems,
//       totalSolved: Object.values(solvedProblems).reduce((a, b) => a + b, 0),
//       profileUrl: `https://leetcode.com/${username}`,
//       handle: username
//     };
//   } catch (err) {
//     console.error('Error scraping LeetCode:', err);
//     return null;
//   }
// }

// // Codeforces scraper using their API
// async function scrapeCodeforces(username) {
//   try {
//     const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
//     const userData = response.data.result[0];

//     // Get contest rating
//     const contestResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${username}`);
//     const contestRatings = contestResponse.data.result;
//     const latestRating = contestRatings.length > 0 
//       ? contestRatings[contestRatings.length - 1].newRating 
//       : userData.rating;

//     // Problem statistics
//     const problemsResponse = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
//     const submissions = problemsResponse.data.result;
    
//     // Count unique solved problems by difficulty
//     const solvedProblems = {
//       easy: new Set(),
//       medium: new Set(),
//       hard: new Set()
//     };

//     submissions.forEach(submission => {
//       if (submission.verdict === 'OK') {
//         const problemDifficulty = submission.problem.rating;
//         const problemKey = `${submission.problem.contestId}${submission.problem.index}`;
        
//         if (problemDifficulty <= 1200) {
//           solvedProblems.easy.add(problemKey);
//         } else if (problemDifficulty <= 1600) {
//           solvedProblems.medium.add(problemKey);
//         } else {
//           solvedProblems.hard.add(problemKey);
//         }
//       }
//     });

//     return {
//       rating: latestRating,
//       rank: userData.rank,
//       solvedProblems: {
//         easy: solvedProblems.easy.size,
//         medium: solvedProblems.medium.size,
//         hard: solvedProblems.hard.size
//       },
//       totalSolved: submissions.filter(s => s.verdict === 'OK').length,
//       profileUrl: `https://codeforces.com/profile/${username}`,
//       handle: username
//     };
//   } catch (err) {
//     console.error('Error scraping Codeforces:', err);
//     return null;
//   }
// }

// // HackerRank scraper 
// async function scrapeHackerRank(username) {
//   try {
//     const response = await axios.get(`https://www.hackerrank.com/rest/hackers/${username}/badges`);
//     const badges = response.data.models;

//     // HackerRank doesn't provide a straightforward way to get problem counts
//     // This is a simplified approach
//     return {
//       rating: badges.length, // Using badge count as a proxy for "rating"
//       rank: 'Not Available',
//       solvedProblems: {
//         easy: 0,  // HackerRank API doesn't provide easy breakdown
//         medium: 0,
//         hard: 0
//       },
//       totalSolved: 0,
//       profileUrl: `https://www.hackerrank.com/${username}`,
//       handle: username
//     };
//   } catch (err) {
//     console.error('Error scraping HackerRank:', err);
//     return null;
//   }
// }

// // GeeksForGeeks scraper
// async function scrapeGeeksForGeeks(username) {
//   try {
//     const response = await axios.get(`https://auth.geeksforgeeks.org/user/${username}/`);
//     const $ = cheerio.load(response.data);
    
//     // Parsing problem-solving stats
//     const problemStats = $('.score-card-head').map((i, el) => {
//       const text = $(el).text().trim();
//       return text;
//     }).get();

//     // Extract problem counts (this might need adjustment based on actual page structure)
//     return {
//       rating: 0, // GeeksForGeeks doesn't have a clear rating system
//       rank: 'Not Available',
//       solvedProblems: {
//         easy: 0,
//         medium: 0,
//         hard: 0
//       },
//       totalSolved: 0,
//       profileUrl: `https://auth.geeksforgeeks.org/user/${username}/`,
//       handle: username
//     };
//   } catch (err) {
//     console.error('Error scraping GeeksForGeeks:', err);
//     return null;
//   }
// }

// module.exports = {
//   scrapePlatform: async (platformName, username) => {
//     switch (platformName.toLowerCase()) {
//       case 'leetcode':
//         return await scrapeLeetCode(username);
//       case 'codeforces':
//         return await scrapeCodeforces(username);
//       case 'hackerrank':
//         return await scrapeHackerRank(username);
//       case 'geeksforgeeks':
//         return await scrapeGeeksForGeeks(username);
//       default:
//         return null;
//     }
//   },

//   updateAllPlatforms: async (userId) => {
//     try {
//       const platforms = await Platform.find({ user: userId });

//       const updatePromises = platforms.map(async platform => {
//         const data = await module.exports.scrapePlatform(platform.platformName, platform.handle);
//         if (data) {
//           platform.rating = data.rating;
//           platform.rank = data.rank;
//           platform.solvedProblems = data.totalSolved;
//           platform.problemBreakdown = data.solvedProblems;
//           platform.profileUrl = data.profileUrl;
//           platform.lastUpdated = new Date();
//           await platform.save();
//         }
//         return platform;
//       });
//       return await Promise.all(updatePromises);
//     } catch (err) {
//       console.error('Error updating platforms:', err);
//       throw err;
//     }
//   }
// };


const axios = require('axios');
const cheerio = require('cheerio');

// LeetCode scraper
async function scrapeLeetCode(username) {
  try {
    const response = await axios.get(`https://leetcode.com/${username}`);
    const $ = cheerio.load(response.data);
    
    // Extract data from the page
    const solved = $('[data-original-title="Problems Solved"]').text().trim();
    const rating = $('.rating-number').text().trim();
    const rank = $('.trophy').first().text().trim();
    
    return {
      rating: parseInt(rating) || 0,
      rank: rank || 'N/A',
      solvedProblems: parseInt(solved) || 0,
      profileUrl: `https://leetcode.com/${username}`
    };
  } catch (err) {
    console.error('LeetCode scraping error:', err);
    return null;
  }
}

// Codeforces scraper
async function scrapeCodeforces(username) {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    const userData = response.data.result[0];
    
    return {
      rating: userData.rating || 0,
      rank: userData.rank || 'N/A',
      solvedProblems: userData.maxRank ? 1000 : 500, // Example - replace with actual scraping
      profileUrl: `https://codeforces.com/profile/${username}`
    };
  } catch (err) {
    console.error('Codeforces scraping error:', err);
    return null;
  }
}

// HackerRank scraper
async function scrapeHackerRank(username) {
  try {
    const response = await axios.get(`https://www.hackerrank.com/rest/hackers/${username}/badges`);
    const badges = response.data.models;
    
    return {
      rating: badges.length * 100,
      rank: 'N/A',
      solvedProblems: badges.reduce((sum, b) => sum + b.stars, 0),
      profileUrl: `https://www.hackerrank.com/${username}`
    };
  } catch (err) {
    console.error('HackerRank scraping error:', err);
    return null;
  }
}

// Main scraper function
module.exports = {
  scrapePlatform: async (platformName, handle) => {
    switch (platformName.toLowerCase()) {
      case 'leetcode':
        return await scrapeLeetCode(handle);
      case 'codeforces':
        return await scrapeCodeforces(handle);
      case 'hackerrank':
        return await scrapeHackerRank(handle);
      default:
        return null;
    }
  },

  updatePlatforms: async (userId) => {
    try {
      const platforms = await Platform.find({ user: userId });
      const updatedPlatforms = [];
      
      for (const platform of platforms) {
        const data = await module.exports.scrapePlatform(
          platform.platformName, 
          platform.handle
        );
        
        if (data) {
          platform.rating = data.rating;
          platform.rank = data.rank;
          platform.solvedProblems = data.solvedProblems;
          platform.profileUrl = data.profileUrl;
          platform.lastUpdated = new Date();
          await platform.save();
          updatedPlatforms.push(platform);
        }
      }
      
      return updatedPlatforms;
    } catch (err) {
      console.error('Error updating platforms:', err);
      throw err;
    }
  }
};