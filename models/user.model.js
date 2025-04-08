import { sequelize} from "./sequelize.js"
import { DataTypes } from "sequelize"

export const Users = sequelize.define(
    'Users',
    {
        //name that comes with @
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {name : true, msg : "Username already taken. Choose another."},
            validate:{
                len : {args : [1,21],msg : "Username should be 1-21 character long"},
                isAlphanumeric : {msg : "Only alphabets and numbers allowed"}
            },
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        displayname : {
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                len :{args: [1,21], msg : "Display name should be 1-21 character long"},
                notEmpty : {msg : "Display name cannot be empty"}
            },
        },
        bio : {
            type : DataTypes.STRING,
            allowNull : true,
            validate:{
                len : {args : [0,255], msg : "Bio should be 0-201 character long"},
            },
        },
        profilepicture : {
            type : DataTypes.TEXT,
            allowNull : true,
            defaultValue : null
        }
    }
)