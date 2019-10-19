import assert from 'assert';
import expect from 'expect';
import app from '../../src/app';
import { Role } from '../../src/classes/role.class';
import { RoleServiceClass } from '../../src/services/roles/roles.class';

describe("'roles' service", async () => {
  let service: RoleServiceClass;
  let role: Role;

  before(() => {
    return new Promise((res, rej) => {
      service = app.services.roles;

      res();
    });
  });

  it('initialized the service', () => {
    assert.ok(service, 'Initialized the service');
  });

  it('created a role', async () => {
    role = Role.New({
      name: 'test',
      icon: 'r',
      permissionLevel: 0
    });
    role = await service.create(role);

    assert.equal(role.name, 'test', "Created a new 'test' role");
  });

  it('get a role', async () => {
    let getRole = await service.get(role.id);

    assert.equal(getRole.name, role.name, "Got the created 'test' role");
  });

  it('find a role', async () => {
    let findRoles = await service.find({ query: { _id: role.id } });

    assert.equal(findRoles[0].name, role.name, "Found the created 'test' role");
  });

  it('update a role', async () => {
    role.name = 'updated';
    let modifiedRole = await service.update(role.id, role);
    assert.equal(
      modifiedRole.name,
      role.name,
      "Modified the 'test' role to 'updated'"
    );
  });

  it('patch a role', async () => {
    role.name = 'patched';
    let patchedRole = await service.patch(role.id, role);

    assert.equal(
      patchedRole.name,
      role.name,
      "Modified the 'updated' role to 'patched'"
    );
  });

  it('remove a role', async () => {
    let removedRole = await service.remove(role.id);

    assert.equal(
      removedRole.id.toString(),
      role.id.toString(),
      "Removed the 'patched' role"
    );
  });
});
