import assert from "assert";
import expect from "expect";
import app from "../../src/app";
import { User } from "../../src/classes/user.class";
import { UserServiceClass } from "../../src/services/users/users.class";
import { Role } from "../../src/classes/role.class";

describe("'users' service", async () => {
  let service: UserServiceClass;
  let user: User;

  before(() => {
    return new Promise((res, rej) => {
      service = app.services.users;

      res();
    });
  });

  it("initialized the service", () => {
    assert.ok(service, "Initialized the service");
  });

  it("created a user", async () => {
    user = User.New({
      name: "test",
      email: "test@gmail.com",
      password: "patate",
      gender: 1,
      role: new Role()
    });
    user = await service.create(user);

    assert.equal(user.name, "test", "Created a new 'test' user");
  });

  it("get a user", async () => {
    let getUser = await service.get(user.id);

    assert.equal(getUser.name, user.name, "Got the created 'test' user");
  });

  it("find a user", async () => {
    let findUsers = await service.find({ query: { _id: user.id } });

    assert.equal(findUsers[0].name, user.name, "Found the created 'test' user");
  });

  it("update a user", async () => {
    user.name = "updated";
    let modifiedUser = await service.update(user.id, user);
    console.log(modifiedUser);

    assert.equal(
      modifiedUser.name,
      user.name,
      "Modified the 'test' user to 'updated'"
    );
  });

  it("remove a user", async () => {
    let removedUser = await service.remove(user.id);

    assert.equal(
      removedUser.id.toString(),
      user.id.toString(),
      "Removed the 'patched' user"
    );
  });
});
