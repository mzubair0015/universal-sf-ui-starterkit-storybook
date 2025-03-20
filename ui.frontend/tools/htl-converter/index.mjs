import fs from "fs";
import path from "path";
import convert from "muban-convert-hbs";

const FILE_EXT = {
  HTL: "htl",
  HBS: "hbs",
};

var filePath = "./src/main/webpack/components/";

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + path.sep + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + path.sep + file, arrayOfFiles);
    } else {
      if (file.split(".")[1] === FILE_EXT.HBS) {
        arrayOfFiles.push(path.join(dirPath, path.sep, file));
      }
    }
  });

  return arrayOfFiles;
};

const hbsFiles = getAllFiles(filePath);
console.debug("Handlebar Files:", hbsFiles);

hbsFiles.forEach((fromPath) => {
  var pathSplits = fromPath.split(path.sep); 
  
  const length = pathSplits.length;
  const fileName = pathSplits[length - 1].split(".")[0];
  console.info("pathSplits", pathSplits)
  pathSplits.pop();
  pathSplits.push(FILE_EXT.HTL); // include htl in the path inorder to move converted files
  console.info("pathSplits", pathSplits)
  const folderName = pathSplits.join(path.sep);
  if (!fs.existsSync(folderName)) {
    console.debug(`Folder ${folderName} is not available, creating it.`);
    fs.mkdirSync(folderName);
  }
  var toPath = `${folderName}${path.sep}${fileName}.${FILE_EXT.HTL}`;
  console.log(toPath);
  const htlFile = convert.default(
    fs.readFileSync(path.resolve(fromPath), "utf-8"),
    FILE_EXT.HTL
  );
  fs.writeFile(toPath, htlFile, function (error) {
    if (error) {
      console.error("File Convertion error.", error);
    } else {
      console.log("Converted file '%s' to '%s'.", fromPath, toPath);
    }
  });
});
