const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');

exports.requestOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ error: 'Mobile required' });

  await Otp.deleteMany({ mobile });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await Otp.create({
    mobile,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  console.log('OTP:', otp);
  res.json({ message: 'OTP sent', otp: otp });
};

exports.verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  const record = await Otp.findOne({ mobile, otp });
  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  let user = await User.findOne({ mobile });
  if (!user) user = await User.create({ mobile });

  await Otp.deleteMany({ mobile });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.json({ token, user });
};
