import fs from "fs";
import path from "path";
import convert from "muban-convert-hbs";

var filePath = "./src/main/webpack/components/";

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.split(".")[1] === "hbs") {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
};

const hbsFiles = getAllFiles(filePath);
console.debug("Handlebar Files:", hbsFiles)

hbsFiles.forEach((fromPath) => {

var toPath = `${fromPath.split(".")[0]}.htl`;
  const htl = convert.default(
    fs.readFileSync(path.resolve(fromPath), "utf-8"),
    "htl"
  );

  fs.writeFile(toPath, htl, function (error) {
    if (error) {
      console.error("File Convertion error.", error);
    } else {
      console.log("Converted file '%s' to '%s'.", fromPath, toPath);
    }
  });
});
