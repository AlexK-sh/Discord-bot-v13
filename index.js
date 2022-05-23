const { Client, Collection } = require("discord.js")
const client = new Client({
  intents: 131071 
})

const settings = require("./config")
const register = require("./modules/register")
const logs = require("./modules/logs")
client.commands = new Collection()
client.slashCommands = new Collection()
client.settings = settings
client.logs = logs
register({ client, settings })

client.login("TOKEN").then(() => {
  logs.info("Conectando", "📡 Conectando el bot!")
}).catch(err => {
  logs.error("Error", err.toString())
})