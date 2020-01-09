import * as authentication from "@feathersjs/authentication";
import roleValidateHook from "../../hooks/validate/role.validate.hook";
import checkPermissions from "../../hooks/checkPermissions.hook";
import roleCheckRemoveHook from "../../hooks/checkRemove/role.checkRemove.hook";
import configuration from "@feathersjs/configuration";
import { adminPermissionLevel } from "../consts";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [/*authenticate('jwt'), */ roleValidateHook()],
    find: [],
    get: [],
    create: [checkPermissions(adminPermissionLevel)],
    update: [checkPermissions(adminPermissionLevel)],
    patch: [checkPermissions(adminPermissionLevel)],
    remove: [checkPermissions(adminPermissionLevel), roleCheckRemoveHook()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
