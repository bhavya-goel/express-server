import * as mongoose from 'mongoose';
import seedData from './seedData';

class Database {

    public static async open(mongoUri) {
      await mongoose.connect(mongoUri, { useNewUrlParser: true }, async (err) => {
          if (err) {
            throw new Error('DB setup failed');
          }
          else {
              await seedData();
          }
      });
    }

    public static close() {
        mongoose.disconnect();
        console.log(' DB connection closed');
    }
}

export default Database;
