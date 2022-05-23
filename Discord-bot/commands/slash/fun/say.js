module.exports = {
    name: "say",
    description: "Escribe algo y el bot lo enviara",
    type: 'CHAT_INPUT',
    options: [
        {
          name: "texto",
          description: "Texto a enviar",
          type: "STRING",
          required: true 
        }
    ],
    run: async (client, interaction, args) => {

        let texto = interaction.options.getString('texto')
        
        interaction.channel.send(texto)
    },
};