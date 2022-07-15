const express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Bill = require('../../models/Bill');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route   POST api/bill
// @desc    Create a bill
// @access  Private
router.post('/', 
    [
        auth, [
            check('text', 'Text is required')
            .not()
            .isEmpty()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors : errors.array()});
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            
            const newBill = new Bill({
                text : req.body.text,
                name : user.name,
                avatar : user.avatar,
                user : req.user.id
            });
            const bill = await newBill.save();

            res.json(bill);
        }
        catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route   GET api/bill
// @desc    Get a bill
// @access  Private

router.get('/', auth, async(req, res) => {
    try {
        const bills = await Bill.find().sort({ date : -1 });
        res.json(bills);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);
// @route   GET api/bill/:id
// @desc    Get a bill by id
// @access  Private

router.get('/:id', auth, async(req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);

        if(!bill) {
           return res.status(404).json({msg: 'Bill does not exist'});
        }
        res.json(bill);
    } catch (err) {
        if(!err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Bill does not exist'});
         }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

// @route   DELETE api/bill/:id
// @desc    Delete a bill by id
// @access  Private

router.delete('/:id', auth, async(req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);

        if(!bill) {
            return res.status(404).json({msg: 'Bill does not exist'});
         }

        if(bill.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'})
        }

        await bill.remove();
        res.json({ msg: 'bill Deleted'});
    } catch (err) {
        if(!err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Bill does not exist'});
         }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);


module.exports = router;