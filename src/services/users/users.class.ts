import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { User, UserModel } from '../../classes/user.class';
import { Params } from '@feathersjs/feathers';
import app from '../../app';
import { Role } from '../../classes/role.class';

export class Users extends Service<User> {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('users');
    });
  }

  async create(data: User, params?: Params) {
    const { name, email, password, gender } = data;

    const userRole = await app.services.roles.getUserRole();
    const userData: UserModel = {
      email,
      name,
      password,
      gender,
      roleId: userRole.id
    };

    return super.create(userData, params);
  }
}
