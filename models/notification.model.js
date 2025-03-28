import { sequelize } from "./sequelize.js"
import { DataTypes } from "sequelize"

export const Notifications = sequelize.define(
    'Notifications',
    {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['like', 'follow', 'mention', 'repost', 'reply', 'quote']],
            },
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        //on which the action happens
        postId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        fromUserId : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    }
)