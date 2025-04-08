import { sequelize } from "./sequelize.js";
import { Users } from './user.model.js'
import { Posts } from './post.model.js'
import { Hashs } from "./hash.model.js";
import { Likes } from "./like.model.js";
import { Reposts } from "./repost.model.js";
import { Bookmarks } from "./bookmark.model.js";
import { Notifications } from "./notification.model.js";
import bcrypt from "bcrypt"

Users.hasMany(Posts, {as : 'UserPosts', foreignKey : 'UserId', onDelete : 'CASCADE'})
Posts.belongsTo(Users, {as : 'User', foreignKey : 'UserId'})

Posts.hasMany(Posts, {as : 'ChildPosts', foreignKey : 'parentpostid', onDelete : 'CASCADE'})
Posts.belongsTo(Posts, {as : 'ParentPost', foreignKey : 'parentpostid'})

Posts.hasOne(Hashs, {as : 'PostHash', foreignKey : 'PostId', onDelete : 'CASCADE'})
Hashs.belongsTo(Posts, {as : 'Hash', foreignKey : 'PostId'})

/*
Post "has many" Users who have liked it.
When looking at a Post, you're interested in which users liked this post.
The term Likers is used because you're looking at users who liked the post (the "likers" are users).
*/
Posts.belongsToMany(Users, {through : Likes, as : 'Likers', foreignKey : 'LikedPostId'})
Users.belongsToMany(Posts, {through : Likes, as : 'LikedPosts', foreignKey : 'LikerUserId'})

Posts.belongsToMany(Users, {through : Reposts, as : 'Reposters', foreignKey : 'RepostedId'})
Users.belongsToMany(Posts, {through : Reposts, as : 'Reposted', foreignKey : 'ReposterId'})

Posts.belongsToMany(Users, {through : Bookmarks, as : 'BookmarkUsers', foreignKey : 'BookmarkPostId'})
Users.belongsToMany(Posts, {through : Bookmarks, as : 'BookmarkPosts', foreignKey : 'BookmarkUserId'})

Users.hasMany(Notifications, {as : 'UserNotifications', foreignKey : 'NotifiedUserId', onDelete : 'CASCADE'})
Notifications.belongsTo(Users, {foreignKey : 'NotifiedUserId'})

Users.hasMany(Notifications, {as : 'CreatedNotifications', foreignKey : 'NotifierUserId', onDelete : 'CASCADE'})
Notifications.belongsTo(Users, {foreignKey : 'NotifierUserId'})

Posts.hasMany(Notifications, {as : 'PostNotifications', foreignKey : 'NotifPostId', onDelete : 'CASCADE'})
Notifications.belongsTo(Users, {foreignKey : 'NotifPostId'})

// await sequelize.sync({})

// let a = await Users.create({username : 'a', bio : 'b', password : 'c', displayname : 'd'})
// let b = await Posts.create({content: 'lda mera loda'})
// let c = await Posts.create({content : 'nahi tu le loda'})
// a.addUserPosts(b)
// b.addChildPost(c)


// Users.hasMany(Videos, {as : 'CreatedVideos', foreignKey : 'CreatorId'})
// Videos.belongsTo(Users, {as : "Creator", foreignKey : 'CreatorId'})


// Users.belongsToMany(Videos, {through : Likes, as : 'LikedVideos'})
// Videos.belongsToMany(Users, {through : Likes, as : 'Likers'})

// Users.belongsToMany(Videos, {through : Retweets})
// Videos.belongsToMany(Users, {through : Retweets})



//sequelize assumes there is only one many to many / or any other relation between 2 tables
//need "as" to create more relations.
// let a = await Users.create({username : 'ayush'})
// let a2 = await Users.create({username : 'piyush'})
// let b = await Videos.create({videoname : 'rawat'})
// a.addLikedVideos(b)
// b.addLikers(a2)
// a.addVideos(b)
// a.addCreatedVideos(b)
// let c = await Likes.create({UserId : a.id, VideoId : b.id})
// let d = await Retweets.create({UserId : a2.id, VideoId : b.id})


export const sync = async () => {
    await sequelize.sync({})

    //create aloo
    let aloo = await Users.findOne({
        where : {
            username : 'aloo'
        }
    })

    if(!aloo){
        let hashedPassword = await bcrypt.hash('abeyaar', 1)
        await Users.create({ username: 'aloo', displayname: 'aloo', password: hashedPassword });
    }

    let user = await Users.findOne({
        where : {
            username : 'skibidi'
        }
    })
    user.set({
        bio : "Time to run wild and leave a sexy corpse"
    })
    await user.save()

}