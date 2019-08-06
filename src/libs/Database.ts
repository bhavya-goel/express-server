import { rejects } from 'assert';
import * as mongoose from 'mongoose';
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
            saveData({
                date: Date.now(),
                name: 'Trainee',
            })
            .then((response) => {
                console.log('data saved is : ', response);
                return dbModel.find({});
            })
            .then((response) => {
                console.log('\n\ndata retrieved is : ', response);
                this.close();
            })
            .catch((error) => {
                console.log('Database write error', error);
                this.close();
            });
        });
    }
    public static close() {
        mongoose.disconnect();
        console.log(' DB connection closed');
    }
}
function saveData(query) {
    return new Promise((resolve, reject) => {
        const data = new dbModel(query);
        data.save((error, response) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(response);
            }
        });
    });
}
export default Database;
