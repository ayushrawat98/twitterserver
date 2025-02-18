import { sequelize} from "./sequelize.js"
import { DataTypes } from "sequelize"

export const Posts = sequelize.define(
    'Posts',
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len : {args : [1,255], msg : 'Should to 1-255 character long'}
            },
        },
        parentpostid : {
            type: DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : 'Posts',
                key : 'id'
            }
        },
        media : {
            type : DataTypes.STRING,
            allowNull : true
        },
        deleted : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : false
        }
    }
)