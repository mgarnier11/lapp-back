import * as authentication from "@feathersjs/authentication";
import questionTypeValidateHook from "../../hooks/validate/question-type.validate.hook";
import checkPermissions from "../../hooks/checkPermissions.hook";
import questionTypecheckRemove from "../../hooks/checkRemove/question-type.checkRemove.hook";
import { adminPermissionLevel } from "../consts";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [/*authenticate("jwt"),*/ questionTypeValidateHook()],
    find: [],
    get: [],
    create: [checkPermissions(adminPermissionLevel)],
    update: [checkPermissions(adminPermissionLevel)],
    patch: [checkPermissions(adminPermissionLevel)],
    remove: [checkPermissions(adminPermissionLevel), questionTypecheckRemove()]
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
