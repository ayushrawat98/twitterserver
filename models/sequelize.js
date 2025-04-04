import { Sequelize } from "sequelize"

// export const sequelize = new Sequelize('sqlite::memory:'); // Example with in-memory database

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'xbharat.db',
    logging : false
})
