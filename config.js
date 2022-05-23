module.exports = {
  prefix: "!",
  // Activar o desactivar sistemas de registro/ejecucion de comandos
  messageCommands: true,
  slashCommands: true,
  // modo desarrollo para los slash commnds
  devMode: {
    dev: false,
    guildId: 939593949667004527
    // si surge el error:
    // "TypeError: Cannot read property 'commands' of undefined"
    // es por que el bot no tiene el scope de slash commands en el servidor
  },
  //activar o desactivar los eventos
  events:true
}