import express from 'express';
import User from './models/user.js';
import { getMain, createTrip, getTrips, getTrip, deleteTrip, updateTrip } from './controllers/tripController.js'

const router = express.Router();

//get homepage - no login needed - main page with map
router.get('/', getMain);

//add new trip
router.post("/", createTrip);

//get all trips
router.get('/api/trips', getTrips);

//main page with trip loaded
router.get('/api/:id', getTrip);

//delete specific trip
router.delete('/api/:id', deleteTrip);

//update specific trip
router.patch('/api/:id', updateTrip);

//user crap 

router.get("/signup", async (req, res) => {
    //get signup page
});

router.post("/signup", async (req, res) => {
    //receive signup data
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    const createdUser = await newUser.save();
    res.json(createdUser);
});

router.get("/login", async (req, res) => {
    //get login page
});

router.post("/login", async (req, res) => {
    //receive login data
});

export default router;

