import { load, save, statusLookup, indexOutOfBounds } from "./utils.js";

export const list = (filterStatus) => {
  const data = load();
  if (["todo", "in-progress", "done"].includes(filterStatus)) {
    console.log(
      `Items with status ${statusLookup[filterStatus]} (${data.length}):`
    );
    console.log(
      data
        .filter(({ status }) => status === filterStatus)
        .map(({ title }) => `${title}`)
        .join("\n")
    );
  } else {
    console.log(`Items (${data.length}):`);
    console.log(
      data
        .map(
          ({ title, status }, i) =>
            `#${i + 1}: ${statusLookup[status]} - ${title}`
        )
        .join("\n")
    );
  }
};

export const add = (title) => {
  if (!title) {
    console.log("You need to have a title of the task");
    return;
  }
  const timestamp = Date.now();
  const data = load();
  const newData = [
    ...data,
    { title, status: "todo", createdAt: timestamp, updatedAt: timestamp },
  ];
  save(newData);
  console.log(`Task "${title}" successfully added to Todo-list`);
};

export const update = (index, title) => {
  const data = load();
  if (indexOutOfBounds(index, data.length)) {
    return;
  }
  const d = { ...data[index - 1], title, updatedAt: Date.now() };
  const newData = data.with(index - 1, d);
  save(newData);
  console.log(`Task #${index} has successfully been updated to "${title}"!`);
};

export const deleteItem = (index) => {
  const data = load();
  if (indexOutOfBounds(index, data.length)) {
    return;
  }
  const newData = data.filter((_, i) => i + 1 !== index);
  save(newData);
};

export const markDone = (index) => {
  const data = load();
  if (indexOutOfBounds(index, data.length)) {
    return;
  }
  const d = { ...data[index - 1], status: "done", updatedAt: Date.now() };
  const newData = data.with(index - 1, d);
  save(newData);
  console.log(
    `Task #${index} has successfully had it's status set to "${statusLookup["done"]}"!`
  );
};

export const markInProgress = (index) => {
  const data = load();
  if (indexOutOfBounds(index, data.length)) {
    return;
  }
  const d = {
    ...data[index - 1],
    status: "in-progress",
    updatedAt: Date.now(),
  };
  const newData = data.with(index - 1, d);
  save(newData);
  console.log(
    `Task #${index} has successfully had it's status set to "${statusLookup["in-progress"]}"!`
  );
};
