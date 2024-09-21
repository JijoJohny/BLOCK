const User = require('../models/User');
const verifySignature = require('../utils/verifySignature');
const crypto = require('crypto');

// Controller to store the nonce sent from the frontend
exports.storeNonce = async (req, res) => {
  const { walletAddress } = req.body;

  try {
    const nonce = generateNonce(); // Generate a new nonce
    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({ walletAddress, nonce });
    } else {
      user.nonce = nonce; // Update existing user's nonce
    }

    await user.save(); // Save the user record
    res.status(200).json({ message: 'Nonce stored successfully', walletAddress, nonce });
  } catch (err) {
    console.error("Error storing nonce:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.authenticateUser = async (req, res) => {
  const { walletAddress, signature } = req.body;

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(401).json({ error: 'Nonce not sent.' });
    }

    const isValidSignature = verifySignature(walletAddress, signature, user.nonce);

    if (!isValidSignature) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    user.nonce = generateNonce(); // Generate a new nonce after successful verification
    await user.save();

    res.status(200).json({ message: 'Authentication successful', walletAddress });
  } catch (err) {
    console.error("Inside controller", err);
    res.status(500).json({ error: 'Server error' });
  }
};

const generateNonce = () => {
  return crypto.randomBytes(16).toString('hex');
};
