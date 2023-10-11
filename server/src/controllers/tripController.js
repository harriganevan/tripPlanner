import Trip from '../models/trip.js';
import mongoose from 'mongoose';

//get main page
const getMain = async (req, res) => {
    res.json({ msg: 'get homepage' });
}

//get all trips
const getTrips = async (req, res) => {
    const trips = await Trip.find({});
    res.json(trips);
}

//get one trip
const getTrip = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "no such trip" });
    }

    const trip = await Trip.findById(id);
    
    if (!trip) {
        return res.json({ error: "trip not found" });
    }

    res.json(trip);
}

//create new trip
const createTrip = async (req, res) => {
    const newTrip = new Trip({
        name: req.body.name,
        destinations: req.body.destinations
    });

    try {
        const createdTrip = await newTrip.save();
        res.json(createdTrip);
    } catch (error) {
        res.json({ error: error.message });
    }
}

//delete trip
const deleteTrip = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "no such trip" });
    }

    const trip = await Trip.findOneAndDelete({ _id: id });

    if (!trip) {
        return res.json({ error: "trip not found" });
    }

    res.json(trip);
}

//update a trip
const updateTrip = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "no such trip" });
    }

    const trip = await Trip.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!trip) {
        return res.json({ error: "trip not found" });
    }

    res.json(trip);

}

export { getMain, createTrip, getTrips, getTrip, deleteTrip, updateTrip }