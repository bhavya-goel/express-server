import * as mongoose from 'mongoose';
import seedData from './seedData';
class Database {
    public static open(mongoUri) {
    return new Promise ((resolve, reject) => {
        mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve('database setup');
                seedData();
            }
        });
    });
    }

    public static close() {
        mongoose.disconnect();
        console.log(' DB connection closed');
    }
}

export default Database;
