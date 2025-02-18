import { sequelize} from "./sequelize.js"
import { DataTypes } from "sequelize"

export const Hashs = sequelize.define(
    'Hashs',
    {
        hash: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps : false,
        indexes: [
            {
                name: 'hash_index',
                fields: ['hash']    
            }
        ]
    }
)