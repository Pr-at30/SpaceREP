const User = require('../models/User');
const Card = require('../models/Card');
const Deck = require('../models/Deck');
const cloudinary = require('../middlewares/cloudinary');

exports.register = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: 'hackOdisha'
        });

        const { name, email, password } = req.body;
        let user = await User.findOne({ email: email });

        if (user) {
            res.status(400).json({
                success: false,
                message: "User already registered"
            })
        };

        user = new User({
            name, email, password, avatar:{public_id: result.public_id , url: result.secure_url}
        })
        user = await user.save();

        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        const token = await user.generateToken();

        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Please Register first'
            })

        }
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or password"
            })
        }

        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        const token = await user.generateToken();


        res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "User logout Successfully"
        })

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}

exports.myProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user._id);
        const card = await Card.find({createdBy: user._id});
        const deck = await Deck.find({createdBy: user._id});
        res.status(200).json({
            success: true,
            user,
            card, 
            deck
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.updateProfile = async (req, res) => {
    try {
        
        const user = await User.findById(req.user._id);
        const { name, email } = req.body;
        
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
            
            await cloudinary.uploader.destroy(user.avatar.public_id);
            const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: 'hackOdisha'
            });
            user.avatar = {public_id: result.public_id || user.avatar.public_id , url: result.secure_url || user.avatar.url}

        await user.save();
        res.status(200).json({
            success: true,
            message: " profile updated successfully",
            user
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const userId = user._id;
        await cloudinary.uploader.destroy(user.avatar.public_id);
        await user.remove();

        // Logout user after deleting profile
        res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

        res.status(200).json({ success: true, message: 'Profile deleted successfully' });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

