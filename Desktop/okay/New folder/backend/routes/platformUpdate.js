const express = require('express');
const Platform = require('../models/Platform');
const auth = require('../middleware/auth');
const platformScraper = require('../services/platformScraper');
const router = express.Router();

// Update all platforms for a user
router.post('/update', auth, async (req, res) => {
  try {
    const updatedPlatforms = await platformScraper.updateAllPlatforms(req.user._id);
    
    res.json({
      success: true,
      platforms: updatedPlatforms
    });
  } catch (err) {
    console.error('Error updating platforms:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update platforms'
    });
  }
});

// Update a specific platform
router.post('/update/:platformId', auth, async (req, res) => {
  try {
    const platform = await Platform.findOne({
      _id: req.params.platformId,
      user: req.user._id
    });
    
    if (!platform) {
      return res.status(404).json({
        success: false,
        error: 'Platform not found'
      });
    }
    
    const data = await platformScraper.scrapePlatform(platform.platformName, platform.handle);
    if (!data) {
      return res.status(400).json({
        success: false,
        error: 'Failed to fetch platform data'
      });
    }
    
    platform.rating = data.rating;
    platform.rank = data.rank;
    platform.solvedProblems = data.solvedProblems;
    platform.profileUrl = data.profileUrl;
    platform.lastUpdated = new Date();
    
    await platform.save();
    
    res.json({
      success: true,
      platform
    });
  } catch (err) {
    console.error('Error updating platform:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update platform'
    });
  }
});

module.exports = router;