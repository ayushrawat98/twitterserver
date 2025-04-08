import { Posts } from "../models/post.model.js"
import { Users } from "../models/user.model.js"
import { Hashs } from "../models/hash.model.js"
import { Likes } from "../models/like.model.js"
import { Reposts } from "../models/repost.model.js"
import { Bookmarks } from "../models/bookmark.model.js"
import { Notifications } from "../models/notification.model.js"
import { getGeminiResponse } from "../helper/gemini.js"

export async function deleteUser(req, res, next) {
    if (process.env.DELETE_KEY == req.query.key) {
        let post = await Users.findByPk(req.query.id)
        await post.destroy()
        return res.json("success")
    }else{
        return res.json("failed")
    }
}

export async function getNotifications(req, res, next) {
    let notif = await Notifications.findAll({
        where: {
            NotifiedUserId: req.user.id
        },
        order: [['createdAt', 'DESC']],
        limit: 20
    })

    return res.json(notif)
}

export async function addUserDetails(req, res, next) {
    let user = await Users.findByPk(req.user.id)
    console.log(req.body)
    user.set({
        displayname : req.body.displayname,
        bio : req.body.bio == "null" ? null : req.body.bio,
        profilepicture : req.file.filename
    })
    await user.save()
    return res.json({bio : user.bio, profilepicture : user.profilepicture, displayname : user.displayname, username : user.username})

}

export async function getUserDetails(req, res, next) {
    let userDetails = await Users.findOne({
        where :{
            username : req.params.username
        },
        attributes : ['bio','profilepicture', 'displayname','username']
    })
    return res.json(userDetails)
}