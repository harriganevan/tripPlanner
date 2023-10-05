import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

const User = new Schema({
    username: String,
    password: String,
    trips: 
        [
            {
                trip: {
                    name: String,
                    destinations: [
                        {
                            destination: {
                                latlng: [],
                                days: Number,
                                details: {
                                    notes: String,
                                    places: [
                                        {
                                            place: {
                                                img: String,
                                                text: String
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
});