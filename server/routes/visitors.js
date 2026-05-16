import express from 'express';
import Visitor from '../models/Visitor.js';

const router = express.Router();

// Save visitor information
router.post('/register', async (req, res) => {
  try {
    const { email, fullName } = req.body;

    // Validation
    if (!email || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Email and full name are required',
      });
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    // Get user IP and user agent
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Create and save visitor record
    const visitor = new Visitor({
      email,
      fullName,
      ipAddress,
      userAgent,
    });

    await visitor.save();

    res.status(201).json({
      success: true,
      message: 'Visitor information saved successfully',
      data: visitor,
    });
  } catch (error) {
    console.error('Error saving visitor:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving visitor information',
      error: error.message,
    });
  }
});

// Get all visitors (for admin dashboard)
router.get('/all', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ visitedAt: -1 });
    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors,
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching visitors',
      error: error.message,
    });
  }
});

export default router;
