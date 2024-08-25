import fs from "fs";

const filename = "data.json";

export const load = () => {
  const exists = fs.existsSync(`./${filename}`);
  if (!exists) {
    fs.writeFileSync(`./${filename}`, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(filename, "utf-8"));
};

export const save = (data) => {
  fs.writeFileSync(`./${filename}`, JSON.stringify(data));
};

export const statusLookup = {
  todo: "Todo",
  done: "Done",
  "in-progress": "In progress",
};

export const indexOutOfBounds = (index, length) => {
  if (index <= 0) {
    console.log(`Lowest possible index is 1, try again`);
    return true;
  }
  if (index > length) {
    console.log(
      `Index is out of bounds and should go no higher than ${length}`
    );
    return true;
  }
  return false;
};
