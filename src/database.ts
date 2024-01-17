import {Sequelize} from "sequelize-typescript"


export const sequelize = new Sequelize(
    'prjct', 'postgres', 'postgres', {
        host: 'localhost',
        dialect: 'postgres',
        models:[__dirname + '/models']
    }
)