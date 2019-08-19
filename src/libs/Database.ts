import * as mongoose from 'mongoose';
import seedData from './seedData';
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
