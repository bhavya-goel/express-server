import * as bcrypt from 'bcrypt';
import { configuration } from '../config';
import { UserRepository } from '../repositories';
import { userModel } from '../repositories/user/UserModel';
const userRepository = new UserRepository();

export default async function seedData() {
    // to create hash for password

    const saltCount = 10;
    const salt = bcrypt.genSaltSync(saltCount);
    const { password } = configuration;
    const hash = bcrypt.hashSync(password, salt);

    const user = {
        email: 'head.trainer@successive.tech',
        name: 'headTrainer',
        password: hash,
        role: 'head-trainer',
    };

    // one time seeding
    try {
      const count = await userModel.countDocuments({});
      if ( count === 0) {
        await userRepository.create(user);
      }
    } catch (err) {
      throw new Error ('Db error');
    }

}
