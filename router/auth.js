const express = require('express');
const router = express.Router();
require('../db/db_connection');
http = require('http');
const user = require('../model/userSchema');
const cars = require('../model/carSchema');




router.get('/',(req,res) =>{
    try{
        
        cars.find({}).then((data)=>{
            // res.send(data)
            res.status(200).json(data);
        })
       
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error:"Fetching car data failure"})
    }
})


router.get('/allcars', (req, res) => {
    cars.find({})
        .then((data) => {
            if (Array.isArray(data)) {
                const carsData = data.map(car => ({
                    id: car._id,
                    carsName: car.name,
                    year: car.year,
                    price: car.price
                }));

                res.status(200).json(carsData);
            } else {
                res.status(500).json({ error: "Unexpected data format" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ error: "Fetching car data failure" });
        });
});



router.post('/addcar', async (req, res) => {
    try {

        const { name, year, price } = req.body;

        if (!name || !year || !price) {
            return res.status(400).json({ error: 'Fill all fields' });
        }
        const newCar = new cars({
            name,
            year,
            price
        });
        console.log(newCar)
        const savedCar = await newCar.save();

        res.status(201).json({
            id: savedCar._id,
            name: savedCar.name,
            year: savedCar.year,
            price: savedCar.price
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while adding car' });
    }
});


router.put('/updatecar', async (req, res) => {
    try {

        const { id,name, year, price } = req.body;

        if (!id || !name || !year || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        console.log(id)
        const updatedCar = await cars.findByIdAndUpdate(
            id,
            { name, year, price },
            { new: true, runValidators: true } 
        );

        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json({
            id: updatedCar._id,
            name: updatedCar.name,
            year: updatedCar.year,
            price: updatedCar.price
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while updating car' });
    }
});

router.delete('/deletecar', async (req, res) => {
    try {
        const { id } = req.body;

        const deletedCar = await cars.findOneAndDelete({ _id: id });

        if (!deletedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }


        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while deleting car' });
    }
});



router.post('/adduser', async (req, res) => {
    try {
        const { name, username, password, role } = req.body;
        if (!name || !username || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newUser = new user({
            name,
            username,
            password, 
            role
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            id: savedUser._id,
            name: savedUser.name,
            username: savedUser.username,
            role: savedUser.role
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while adding user' });
    }
});

module.exports = router;