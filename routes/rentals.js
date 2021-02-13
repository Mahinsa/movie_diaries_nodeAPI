const express = require('express');
const mongoose = require("mongoose");
const Fawn = require("fawn");
const {Customer} = require("../models/customer");
const {Movie} = require("../models/movie");
const {Rental,validate} = require("../models/rental")
const auth = require('../middleware/auth');
const today = new Date(Date.now());
const router = express.Router();

Fawn.init(mongoose);

router.get("/",async (req,res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

router.post("/", auth, async (req,res)=>{
    var returnDate = "not updated";
    var rental_fee = 0.00;
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("Invalid customerId");

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Invalid movieId");

    if(movie.numberInStock === 0) return res.status(400).send("Movie is not in the stock");

    if(req.body.dateReturned){
        const today = new Date(req.body.dateReturned);
        returnDate = today.toDateString();
    }

    if(req.body.rentalFee>0 && customer.isGold){
        rental_fee = req.body.rentalFee*0.5;
    }else if(req.body.rentalFee>0){
        rental_fee = req.body.rentalFee;
    }

    const rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            isGold:customer.isGold,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        },
        dateReturned:returnDate,
        rentalFee:rental_fee
    });

    try {
        new Fawn.Task()
            .save('rentals',rental)
            .update('movies',{_id:movie._id},{
                $inc:{numberInStock:-1}
            })
            .run();
    
        res.send(rental);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
    
});

module.exports = router;