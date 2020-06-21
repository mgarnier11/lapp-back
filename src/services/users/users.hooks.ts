import * as feathersAuthentication from "@feathersjs/authentication";
import * as local from "@feathersjs/authentication-local";
import userValidateHook from "../../hooks/validate/user.validate.hook";
import protectHook from "../../hooks/protect.hook";
import checkUserHook from "../../hooks/checkUser.hook";
import searchRegex from "../../hooks/searchRegex.hook";
import {
  afterFindHook,
  afterGetHook,
  afterCreateHook
} from "../../hooks/users/protectIDViceUsers.hook";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [userValidateHook()],
    find: [authenticate("jwt"), searchRegex()],
    get: [authenticate("jwt")],
    create: [hashPassword("password")],
    update: [hashPassword("password"), authenticate("jwt"), checkUserHook()],
    patch: [hashPassword("password"), authenticate("jwt"), checkUserHook()],
    remove: [authenticate("jwt"), checkUserHook()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protectHook("password")
    ],
    find: [afterFindHook()],
    get: [
      /*afterGetHook()*/
    ],
    create: [afterCreateHook()],
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
