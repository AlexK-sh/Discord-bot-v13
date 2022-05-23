const fs = require("fs");
const logs = require("./logs");

module.exports = (async ({client, settings})=> {
  if(!client || !settings) {
    clgs.error("No se han enviando todos los argumentos en el modulo de registro de comandos")
  }
  
  let root = __dirname+"/../commands/"

  // Message Commands
  if(settings.messageCommands){
    let commandsMessages = fs.readdirSync(root+"messages") || []
  
    for( dirs of commandsMessages ){
      let filesOfDirs = fs.readdirSync(root+"messages/"+dirs).filter(file => file.endsWith(".js")) || []
      for(files of filesOfDirs){
        let file = require(root+"messages/"+dirs+"/"+files)
        client.commands.set(file.name, file)
      }
    }
    logs.info("MESSAGE COMMANDS", `Se han cargado ${client.commands.size} comandos de mensajes`)
  } else {
    logs.info("info", "No se han cargado los comandos de mensajes")
  }
  
  // SlashCommands
  if(settings.slashCommands){

    let slashCommand = [] 
    let arrayOfSlashCommands = [];
    let dir = fs.readdirSync(root+"slash") || []
    
    for( dirs of dir ){
      let filesOfDirs = fs.readdirSync(root+"slash/"+dirs).filter(file => file.endsWith(".js")) || []
      for(files of filesOfDirs){
        let file = require(root+"slash/"+dirs+"/"+files)
        console.log("1");
        if (!file.name) return;
        console.log("2");
        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        console.log("3");
        client.slashCommands.set(file.name, file)       
        arrayOfSlashCommands.push(file);
        console.log("4");
      }
    }
    logs.info("SLASH COMMANDS", `Se han cargado ${client.slashCommands.size} comandos de slash`)

    client.on("ready", async () => {
      if(settings.devMode.dev){
        await client.guilds.cache.get(`${settings.devMode.guildId}`).commands.set(arrayOfSlashCommands);
      }else{
        await client.application.commands.set(arrayOfSlashCommands)
      }
    })
  } else {
    logs.info("info", "No se han cargado los comando de barra")
  }

  // events
  if(settings.events){
    let root = __dirname+"/../events/"
    let events = fs.readdirSync(root).filter(file => file.endsWith(".js")) || []
  
    for( file of events ){
      const event = require(`${root}${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
    logs.info("info", "Se han cargado "+ events.length +" eventos")
  } else {
    logs.info("info", "No se han cargado los eventos")
  }
})