const fs = require("fs");
const moment = require("moment");
moment.locale("es-ec");

module.exports = {
    info: (reason, string) => {
        if(!reason) reason = "info";
        if(!string)return console.log(`${moment().format("LTS")} | ❌ log no ingresado.`);
    
        fs.readFile(`${process.cwd()}/logs.txt`, "utf8", (err, data) => {
        let time = `[${moment().format("L")} ${moment().format("LTS")}] [${reason}]: `; 
        let point = string.endsWith(".") ? "" : ".";
        let log = `${time} ${string}${point}`;
    
        if (data === "") {
            fs.writeFile(`${process.cwd()}/logs.txt`, log, () => {});
    
            console.log(log);
        } else {
            fs.appendFile(`${process.cwd()}/logs.txt`,"\n"+log, () => {});
    
            console.log(log);
        }
        
      });
    },
    error: (reason, string) => {
        if(!reason) reason = "info";
        if(!string)return console.log(`${moment().format("LTS")} | ❌ log no ingresado.`);
        let root = `${process.cwd()}/logs-error.txt`;

        fs.readFile(root, "utf8", (err, data) => {
        let time = `[${moment().format("L")} ${moment().format("LTS")}] [${reason}]: `; 
        let point = string.endsWith(".") ? "" : ".";
        let log = `${time} ${string}${point}`;
    
        if (data === "") {
            fs.writeFile(root, log, () => {});
    
            console.log(log);
        } else {
            fs.appendFile(root, "\n"+log, () => {});
    
            console.log(log);
        }
        
      });
    }
}