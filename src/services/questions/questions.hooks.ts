import * as authentication from "@feathersjs/authentication";
import questionValidateHook from "../../hooks/validate/question.validate.hook";
import checkPermissions from "../../hooks/checkPermissions.hook";
import questionCheckRemoveHook from "../../hooks/checkRemove/question.checkRemove.hook";
import { adminPermissionLevel } from "../consts";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt"), questionValidateHook()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      checkPermissions(adminPermissionLevel * 10),
      questionCheckRemoveHook()
    ]
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
