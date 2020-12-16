// NODE
const fs = require("fs");

fs.readFile("sample.csv", { encoding: "utf-8" }, (err, data) => {
  !err ? console.log(splitNames(data)) : console.log(err);
});

const splitNames = (samp) => {
  const output = [];

  const arr = samp.split("\n").filter(Boolean); // REMOVE ANY EMPTY ROWS FROM PARSE
  arr.shift(); //   REMOVE FIRST LINE OF VALUES
  arr.map((a) => {
    let arr = a.split(",").map((s) => s.trim()); //   SPLIT BY COMMA THEN TRIM EACH ITEM IN ARRAY
    let fullName = arr[0].split(" "); // SPLIT NAME [0] VALUE TO GET BOTH FIRST AND LAST NAME
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

// BONUS
const anagram = (w1, w2) => {
  if (w1.length != w2.length) return false;
  return w1.split("").sort().join("") === w2.split("").sort().join("")
    ? true
    : false;
};

console.log(anagram("parallel of latitude", "parallel of altitude"));
console.log(
  anagram(
    "supercalifragilisticexpialidocious",
    "Hippopotomonstrosesquippedaliophob"
  )
);

// USING CSV PARSE
// const csv = require("csv-parser");

// fs.createReadStream("sample.csv")
//   .pipe(csv())
//   .on("data", (row) => {
//     let fullName = row.name.split(" ");
//     let person = {
//       first_name: fullName[0],
//       last_name: fullName[fullName.length - 1],
//       date_of_birth: row[" date of birth"],
//       address: row[" address"],
//       city: row[" city"],
//       country: row[" country"],
//     };

//     Object.keys(person).map(
//       (val) =>
//         (person[val] =
//           typeof person[val] === "string" ? person[val].trim() : person[val])
//     );

//     outputNode.push(person);
//   })
//   .on("end", () => console.log(outputNode));
