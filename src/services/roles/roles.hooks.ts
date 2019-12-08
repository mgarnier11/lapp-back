import * as authentication from "@feathersjs/authentication";
import roleValidateHook from "../../hooks/validate/role.validate.hook";
import checkPermissions from "../../hooks/checkPermissions";
import roleCheckRemoveHook from "../../hooks/checkRemove/role.checkRemove.hook";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [/*authenticate('jwt'), */ roleValidateHook()],
    find: [],
    get: [],
    create: [checkPermissions(100)],
    update: [checkPermissions(100)],
    patch: [checkPermissions(100)],
    remove: [checkPermissions(100), roleCheckRemoveHook()]
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
