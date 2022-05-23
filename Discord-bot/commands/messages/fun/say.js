module.exports = {
    name: "say",
    run: async (client, message, args) => {       
        let texto = args.join(' ')
        if(!texto){
          return message.channel.send("Debes escribir algo para enviar!")
        }
       
        message.channel.send(text)
    }
}