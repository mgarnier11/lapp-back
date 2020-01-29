import * as authentication from "@feathersjs/authentication";
import checkPermissions from "../../hooks/checkPermissions.hook";
import questionTemplateValidateHook from "../../hooks/validate/question-template.validate.hook";
import questionTemplatecheckRemove from "../../hooks/checkRemove/question-template.checkRemove.hook";
import { adminPermissionLevel } from "../consts";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt"), questionTemplateValidateHook()],
    find: [],
    get: [],
    create: [checkPermissions(adminPermissionLevel)],
    update: [checkPermissions(adminPermissionLevel)],
    patch: [checkPermissions(adminPermissionLevel)],
    remove: [
      checkPermissions(adminPermissionLevel),
      questionTemplatecheckRemove()
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
