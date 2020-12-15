// NODE

const csv = require("csv-parser");
const fs = require("fs");

const outputNode = [];

fs.createReadStream("sample.csv")
  .pipe(csv())
  .on("data", (row) => {
    let fullName = row.name.split(" ");
    let person = {
      first_name: fullName[0],
      last_name: fullName[fullName.length - 1],
      date_of_birth: row[" date of birth"],
      address: row[" address"],
      city: row[" city"],
      country: row[" country"],
    };

    Object.keys(person).map(
      (val) =>
        (person[val] =
          typeof person[val] === "string" ? person[val].trim() : person[val])
    );

    outputNode.push(person);
  })
  .on("end", () => console.log(outputNode));

//   JAVASCRIPT
const sample = `name, date of birth, address, city, country
John Smith, 1989-01-01, 123 Fort Street, Victoria, Canada
Amy C Adams, 1980-04-23, 464 Cook Street, Victoria, Canada
Evan R, 1973-06-24, 11 Moore Drive, San Francisco, United States`;

const splitNames = (samp) => {
  const output = [];
  const arr = samp.split("\n");
  //   REMOVE FIRST LINE OF VALUES
  arr.shift();

  arr.map((a) => {
    //   SPLIT BY COMMA THEN TRIM EACH ITEM IN ARRAY
    let arr = a.split(",").map((s) => s.trim());
    // SPLIT NAME [0] VALUE TO GET BOTH FIRST AND LAST NAME
    let fullName = arr[0].split(" ");
    let person = {
      first_name: fullName[0],
      last_name: fullName[fullName.length - 1], // WORKING BACKWARDS AVOIDS MIDDLE NAME
      date_of_birth: arr[1],
      address: arr[2],
      city: arr[3],
      country: arr[4],
    };
    output.push(person);
  });
  return output;
};

console.log(splitNames(sample));

// BONUS
const anagram = (w1, w2) => {
  if (w1.length != w2.length) return false;
  return w1.split("").sort().join("") === w2.split("").sort().join("")
    ? true
    : false;
};

console.log(anagram("mum", "mmu"));
