const express = require('express');
const {Customer,validate} = require("../models/customer")
const auth = require('../middleware/auth');
const router = express.Router();

router.get("/",async (req,res)=>{
    const customers = await Customer.find();
    res.send(customers);
})

router.get("/:id", async (req,res)=>{
    try {
        const customer = await Customer.findById(req.params.id);
        if(customer)
        res.send(customer);
    } catch (error) {
        res.send("Invalid Customer ID");
    }
})

router.post("/", auth, async (req,res)=>{
    const {error} = validate(req.body);
    if(error){
        res.send(error.details[0].message);
        return;
    }

    const customer = new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    })

    await customer.save();
    res.send(customer);

})

router.put("/:id",auth, async (req,res)=>{
    const result = validate(res.body);
    if(result.error){
        res.send(result.error.details[0].message);
        return;
    }
    try {
        const customer = await Customer.findByIdAndUpdate({_id:req.params.id},{
            isGold:req.body.isGold,
            name:req.body.name,
            phone:req.body.phone
        },{new:true})
        res.send(customer);
    } catch (error) {
        res.send("Invalid Customer ID");
    }
})

router.delete("/:id", auth, async (req,res)=>{
    try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;