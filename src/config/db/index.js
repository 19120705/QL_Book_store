const Sequelize = require('sequelize');
//const initModels = require("../../app/models/init-models");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, port: process.env.DB_PORT, 
    dialect: 'mysql'
    // dialectOptions: {
    //     socketPath: process.env.DB_HOST
    // },
});

sequelize.authenticate().then(() => {
    console.log("Connected");
}).catch(()=> {
    console.log("NotConnected"); 
})
module.exports = {
    sequelize
    //models: initModels(sequelize),
};