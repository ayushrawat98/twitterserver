import { sequelize } from "./sequelize.js";
import { Users } from './user.model.js'
import { Posts } from './post.model.js'
import { Hashs } from "./hash.model.js";
import { Likes } from "./like.model.js";
import { Reposts } from "./repost.model.js";
import { Bookmarks } from "./bookmark.model.js";
import { Notifications } from "./notification.model.js";

Users.hasMany(Posts, {as : 'UserPosts', foreignKey : 'UserId', onDelete : 'CASCADE'})
Posts.belongsTo(Users, {as : 'User', foreignKey : 'UserId'})

Posts.hasMany(Posts, {as : 'ChildPosts', foreignKey : 'parentpostid'})
Posts.belongsTo(Posts, {as : 'ParentPost', foreignKey : 'parentpostid'})

Posts.hasOne(Hashs, {as : 'PostHash', onDelete : 'CASCADE', foreignKey : 'PostId'})
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
    for(let a of [93,94,95]){
      let b =  await Posts.findByPk(a)
    await b.destroy()
    }

}