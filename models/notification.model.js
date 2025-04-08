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
        NotifiedUserId : {
            type: DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : 'Users',
                key : 'id'
            }
        },
        NotifierUserId : {
            type: DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : 'Users',
                key : 'id'
            }
        },
        NotifPostId : {
            type: DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : 'Posts',
                key : 'id'
            }
        }
    }
)