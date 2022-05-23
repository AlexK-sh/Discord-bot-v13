module.exports = {
    name: "ready",
    execute: async (client) => {
        client.logs.info("Conexion Completa", "✅ El bot se ha conectado con exito!")
    }
}