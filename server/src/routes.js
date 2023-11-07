import express from 'express';
import { createTrip, getTrips, getTrip, deleteTrip, updateTrip, getOTMResult, getAttractionDetails, getCityName } from './controllers/tripController.js'
import { loginUser, signupUser } from './controllers/userController.js';
import requireAuth from './middleware/requireauth.js';

const router = express.Router();

//add new trip
router.post("/api/trips", requireAuth, createTrip);

//get all trips
router.get('/api/trips', getTrips);

//main page with trip loaded
router.get('/api/:id', getTrip);

//delete specific trip
router.delete('/api/:id', requireAuth, deleteTrip);

//update specific trip
router.patch('/api/:id', requireAuth, updateTrip);

//otmapi
router.get('/api/otmAPI/:method/:query', getOTMResult)

//retrieve img url and description with wikidata
router.get('/api/details/:wikidata', getAttractionDetails);

//get nearest city name with pop > 15000
router.get('/api/getCityName/:lat/:lng', getCityName);

//user crap <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.post("/api/signup", signupUser);

router.post("/api/login", loginUser);

export default router;