// const express = require('express');
// const router = express.Router();
// const Platform = require('../models/Platform');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// // Get all platforms for current user
// router.get('/platforms', auth, async (req, res) => {
//   try {
//     const platforms = await Platform.find({ user: req.user.id });
//     res.json(platforms);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Add a new platform
// router.post('/platforms', auth, async (req, res) => {
//   const { platformName, handle } = req.body;

//   try {
//     // Check if platform already exists for this user
//     let platform = await Platform.findOne({ 
//       user: req.user.id, 
//       platformName 
//     });

//     if (platform) {
//       return res.status(400).json({ msg: 'Platform handle already added' });
//     }

//     // Create new platform
//     platform = new Platform({
//       user: req.user.id,
//       platformName,
//       handle
//     });

//     await platform.save();
//     res.json(platform);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(400).json({ msg: 'Invalid platform data' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

// // Update platform
// router.put('/platforms/:id', auth, async (req, res) => {
//   const { handle } = req.body;

//   try {
//     let platform = await Platform.findById(req.params.id);

//     if (!platform) {
//       return res.status(404).json({ msg: 'Platform not found' });
//     }

//     // Check if platform belongs to user
//     if (platform.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     platform.handle = handle;
//     platform.lastUpdated = Date.now();

//     await platform.save();
//     res.json(platform);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(400).json({ msg: 'Invalid platform ID' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

// // Delete platform
// router.delete('/platforms/:id', auth, async (req, res) => {
//   try {
//     const platform = await Platform.findById(req.params.id);

//     if (!platform) {
//       return res.status(404).json({ msg: 'Platform not found' });
//     }

//     // Check if platform belongs to user
//     if (platform.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     await platform.remove();
//     res.json({ msg: 'Platform removed' });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(400).json({ msg: 'Invalid platform ID' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

// // Update platform rankings/stats (could be called by a cron job)
// router.post('/platforms/update-stats', auth, async (req, res) => {
//   const { platformId, rating, rank, solvedProblems } = req.body;

//   try {
//     let platform = await Platform.findById(platformId);

//     if (!platform) {
//       return res.status(404).json({ msg: 'Platform not found' });
//     }

//     // Check if platform belongs to user
//     if (platform.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     platform.rating = rating || platform.rating;
//     platform.rank = rank || platform.rank;
//     platform.solvedProblems = solvedProblems || platform.solvedProblems;
//     platform.lastUpdated = Date.now();

//     await platform.save();
//     res.json(platform);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;


const express = require('express');
const Platform = require('../models/Platform');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// ✅ Get all platform handles for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const platforms = await Platform.find({ user: req.user._id });
    res.json(platforms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch platforms' });
  }
});

// ✅ Add or update a platform handle
router.post('/', auth, async (req, res) => {
  const { platformName, handle, rating, rank, solvedProblems, profileUrl } = req.body;

  if (!platformName || !handle) {
    return res.status(400).json({ error: 'Platform name and handle are required' });
  }

  try {
    const existing = await Platform.findOne({ user: req.user._id, platformName });

    if (existing) {
      // Update existing platform
      existing.handle = handle;
      existing.rating = rating || existing.rating;
      existing.rank = rank || existing.rank;
      existing.solvedProblems = solvedProblems ?? existing.solvedProblems;
      existing.profileUrl = profileUrl || existing.profileUrl;
      existing.lastUpdated = new Date();
      await existing.save();
      return res.json({ message: 'Platform updated', platform: existing });
    }

    const newPlatform = new Platform({
      user: req.user._id,
      platformName,
      handle,
      rating,
      rank,
      solvedProblems,
      profileUrl
    });

    await newPlatform.save();

    // Update user's platform list
    req.user.platforms.push(newPlatform._id);
    await req.user.save();

    res.status(201).json({ message: 'Platform added', platform: newPlatform });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add/update platform', details: err.message });
  }
});
// ✅ Delete a platform handle
router.delete('/:platformName', auth, async (req, res) => {
  const { platformName } = req.params;
  try {
    const deleted = await Platform.findOneAndDelete({
      user: req.user._id,
      platformName
    });
    if (!deleted) return res.status(404).json({ error: 'Platform not found' });
    // Remove reference from User model
    req.user.platforms = req.user.platforms.filter(
      id => id.toString() !== deleted._id.toString()
    );
    await req.user.save();
    res.json({ message: 'Platform deleted', platform: deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete platform' });
  }
});
module.exports = router;