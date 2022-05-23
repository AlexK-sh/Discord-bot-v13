module.exports = {
    name: "messageCreate",
    execute: (message, client) => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        if(message.content.startsWith(client.settings.prefix)){
            const args = message.content.slice(client.settings.prefix.length).split(/ +/);
            const command = args.shift().toLowerCase();
            if(!client.commands.has(command)) return;
            try{
                client.commands.get(command).run(client, message, args);
                client.logs.info("info", `${message.author.tag} ha ejecutado el comando ${command} en el servidor ${message.guild.name} canal ${message.channel.name}`)
            }catch(error){
                client.logs.err(error);
            }
        }
    }
}