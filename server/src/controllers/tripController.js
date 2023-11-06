import Trip from '../models/trip.js';
import mongoose from 'mongoose';
import apiGet from '../otmAPI.js';
import md5 from 'blueimp-md5';
import dotenv from "dotenv";
dotenv.config();

const username = process.env.GEONAMES_USERNAME

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
        name: req.body.tripName,
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

//get opentripmap api response
const getOTMResult = async (req, res) => {
    const { method, query } = req.params;

    apiGet(method, query).then(function (data) {
        res.json(data);
    })

}

//responds with {imgURL: ..., description: ...} given wikidata ID
const getAttractionDetails = async (req, res) => {
    const { wikidata } = req.params;

    const imageResponse = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${wikidata}&property=P18&format=json`);
    const imageJson = await imageResponse.json();
    var imageURL;
    if (imageJson.claims && imageJson.claims.P18) {
        const imageNameNoSpace = (imageJson.claims.P18[0].mainsnak.datavalue.value).replace(/ /g, "_");
        const hashedImage = md5(imageNameNoSpace);
        imageURL = `https://upload.wikimedia.org/wikipedia/commons/thumb/${hashedImage[0]}/${hashedImage.substring(0, 2)}/${imageNameNoSpace}/400px-${imageNameNoSpace}`;
    } else {
        imageURL = `no image available`;
    }

    const titleResponse = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidata}&props=sitelinks&format=json`);
    const titleJson = await titleResponse.json();
    var description;
    if (titleJson.entities[wikidata].sitelinks.enwiki) {
        const titleResponseNoSpace = (titleJson.entities[wikidata].sitelinks.enwiki.title).replace(/ /g, "_");
        const descriptionResponse = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${titleResponseNoSpace}`);
        const descriptionJson = await descriptionResponse.json();
        const pageid = Object.keys(descriptionJson.query.pages)[0];
        description = descriptionJson.query.pages[pageid].extract.substring(0, 500);
        for (let i = description.length - 1; i > 0; i--) {
            if (description[i] == '.') {
                description = description.substring(0, i + 1);
                break;
            }
        }
    } else {
        description = "no description available";
    }

    const value = { img: imageURL, description: description };

    res.json(value);
}

const getCityName = async (req, res) => {
    const { lat, lng } = req.params;
    const nameResponse = await fetch(`https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&cities=cities15000&username=${username}`);
    const nameJson = await nameResponse.json();
    var name = '';
    if(nameJson.geonames && nameJson.geonames[0]) {
        name = nameJson.geonames[0].name;
    } else {
        name = 'no nearby city';
    }
    res.json(name);
}

export { createTrip, getTrips, getTrip, deleteTrip, updateTrip, getOTMResult, getAttractionDetails, getCityName }