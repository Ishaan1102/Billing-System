const express = require('express');
var router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   Get api/profile/me
// @desc    Get current users profilex  
// @access  Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user : req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg : 'There is no profile'});
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   Post api/profile/me
// @desc    Create or update a user profile
// @access  Private

router.post('/', 
    [
        auth, 
        [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors : errors.array() });   
        }
        const {
            company,
            website,
            location
        } = req.body;

        // build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;

        try {
            let profile = await Profile.findOneAndDelete({ user : req.user.id });

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user : req.user.id}, 
                    { $set : profileFields}, 
                    { new : true}
                    );
                return res.json(profile);    
            }
            // Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
})

// @route   Get api/profile
// @desc    Get all profiles
// @access  Private

router.get('/', async(req, res) => {
    try {   
        const profiles = await Profile.find().populate('user', [ 'name', 'avatar']);
        res.json(profiles);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   Get api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public

router.get('/user/:user_id', async(req, res) => {
    try {   
        const profile = await Profile.findOne({ user : req.params.user_id }).populate('user', [ 'name', 'avatar']);
        if(!profile){
            return res.status(400).json({ msg: "Profile not found"});
        }
        
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        if(err.kind == 'ObjectID') {
            return res.status(400).json({ msg: "Profile not found"});
        }
        res.status(500).send('Server error');
    }
})

// @route   Delete api/profile
// @desc    Delete profile,user and posts
// @access  Private

router.delete('/', auth, async(req, res) => {
    try {   

        await Promise.all([
        // Remove profile
        Profile.findOneAndRemove({ user : req.user.id }),
        // Remove user
        User.findOneAndRemove({ _id: req.user.id }),
    ]);
        res.json({ msd: 'User deleted'});

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;