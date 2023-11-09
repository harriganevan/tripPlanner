import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TripSchema = new Schema({
    name: String,
    destinations: [
        {
            name: String,
            latlng: [Number],
            days: Number,
            notes: String,
            places: [
                {
                    img: String,
                    text: String,
                    name: String
                }
            ]
        }
    ],
    user_id: {
        type: String,
        required: true
    }
});

const TripModel = mongoose.model("Trip", TripSchema);

export default TripModel;