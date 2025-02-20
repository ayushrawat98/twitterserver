import { sequelize } from "./sequelize.js";
import { Users } from './user.model.js'
import { Posts } from './post.model.js'
import { Hashs } from "./hash.model.js";
import { Likes } from "./like.model.js";

Users.hasMany(Posts, {as : 'UserPosts', foreignKey : 'UserId', onDelete : 'CASCADE'})
Posts.belongsTo(Users, {as : 'User', foreignKey : 'UserId'})

Posts.hasMany(Posts, {as : 'ChildPosts', foreignKey : 'parentpostid'})
Posts.belongsTo(Posts, {as : 'ParentPost', foreignKey : 'parentpostid'})

Posts.hasOne(Hashs, {as : 'PostHash', onDelete : 'CASCADE', foreignKey : 'PostId'})
Hashs.belongsTo(Posts, {as : 'Hash', foreignKey : 'PostId'})

Posts.belongsToMany(Users, {through : Likes, as : 'Likers', foreignKey : 'LikerUserId'})
Users.belongsToMany(Posts, {through : Likes, as : 'LikedPosts', foreignKey : 'LikedPostId'})

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
}