import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TripSchema = new Schema({
    name: String,
    destinations: [
        {
            latlng: [Number],
            days: Number,
            notes: String,
            places: [
                {
                    img: String,
                    text: String
                }
            ]
        }
    ]
});

const TripModel = mongoose.model("Trip", TripSchema);

export default TripModel;