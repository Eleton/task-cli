#!/usr/bin/node

import {
  list,
  add,
  update,
  deleteItem,
  markDone,
  markInProgress,
} from "./commands.js";

const [, , method, arg1, arg2] = process.argv;

const parseIndex = (arg) => {
  const index = parseInt(arg, 10);
  if (isNaN(index)) {
    throw new Error(`Expected a number but got value "${arg}"`);
  }
  return index;
};

switch (method) {
  case "list":
    list(arg1);
    break;
  case "add":
    add(arg1);
    break;
  case "update": {
    update(parseIndex(arg1), arg2);
    break;
  }
  case "delete": {
    deleteItem(parseIndex(arg1));
    break;
  }
  case "mark-in-progress": {
    markInProgress(parseIndex(arg1));
    break;
  }
  case "mark-done": {
    markDone(parseIndex(arg1));
    break;
  }
  default:
    console.log(`"${method}" is not a known method`);
}
