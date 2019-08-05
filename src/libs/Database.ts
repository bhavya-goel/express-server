import * as mongoose from 'mongoose'
import { resolve } from 'url';
import { rejects } from 'assert';
const dbSchema = new mongoose.Schema({
    name: String,
    date: Date,
});
const dbModel = mongoose.model('dbModel', dbSchema);

class Database {
    static open(mongoUri){
        mongoose.connect(mongoUri, { useNewUrlParser: true }, (error) => {
            if(error)
            {
                console.log('database connection error');
            }
            console.log('database setup');  
            saveData({
                name: 'Trainee',
                date: new Date()
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
                console.log('Database write error');
                this.close();
            })

        });
    }
    static close(){
        mongoose.disconnect();
        console.log(' DB connection closed')
    }
}
function saveData(query){
    return new Promise((resolve, reject) => {
        const data = new dbModel(query);
        data.save((error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response);
            }
        })
    });
}
export default Database;
