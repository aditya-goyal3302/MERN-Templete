const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(null, { password: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}