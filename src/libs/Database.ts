import * as mongoose from 'mongoose';
import seedData from './seedData';
const dbSchema = new mongoose.Schema({
    date: Date,
    name: String,
});
const dbModel = mongoose.model('dbModel', dbSchema);

class Database {
    public static open(mongoUri) {
        mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('database connection error');
            }
            console.log('database setup');
            seedData();
        });
    }

    public static close() {
        mongoose.disconnect();
        console.log(' DB connection closed');
    }
}

export default Database;
