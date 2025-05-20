import { Posts } from "../models/post.model.js"
import { Users } from "../models/user.model.js"
import { Hashs } from "../models/hash.model.js"
import { Likes } from "../models/like.model.js"
import { Reposts } from "../models/repost.model.js"
import { Bookmarks } from "../models/bookmark.model.js"
import { Notifications } from "../models/notification.model.js"
import { getGeminiResponse } from "../helper/gemini.js"

export async function getAllPosts(req, res, next) {
    let pageno = req.query.page
    let offset = (pageno * 20)

    let result = await Posts.findAll({
        where: {
            deleted: false,
            parentpostid: null
        },
        limit: 20,
        offset: offset,
        order: [['createdAt', 'DESC']],
        include: [{
            model: Users,
            as: 'User',
            attributes: ['username', 'displayname', 'bio', 'id', 'profilepicture']
        },
        ]
    })


    if (result) {
        let resultJson = result.map(x => x.toJSON())
        let index = 0
        for (let x of result) {
            let [likecount, commentcount, repostcount, bookmarkcount, liked, reposted, bookmarked] = await postDetailer(x, { body: { id: req.user?.id } })
            resultJson[index].likecount = likecount
            resultJson[index].commentcount = commentcount
            resultJson[index].liked = liked
            resultJson[index].repostcount = repostcount
            resultJson[index].reposted = reposted
            resultJson[index].bookmarkcount = bookmarkcount
            resultJson[index].bookmarked = bookmarked
            ++index
        }
        return res.status(200).json(resultJson)
    } else {
        return res.status(400).json([])
    }
}

export async function getAllUserPosts(req, res, next) {
    let User = await Users.findOne({
        where: {
            username: req.params.username
        },
        include: {
            model: Posts,
            as: 'UserPosts',
            limit: 20,
            order: [['createdAt', 'DESC']],
            include: {
                model: Users,
                as: 'User',
                attributes: ['username', 'displayname', 'bio', 'id', 'profilepicture']
            }
        }
    })

    if (User) {
        let jsonUserPosts = User.toJSON().UserPosts
        let index = 0
        for (const element of User.UserPosts) {
            let [likecount, commentcount, repostcount, bookmarkcount, liked, reposted, bookmarked] = await postDetailer(element, { body: { id: req.user?.id } })
            jsonUserPosts[index].commentcount = commentcount
            jsonUserPosts[index].likecount = likecount
            jsonUserPosts[index].repostcount = repostcount
            jsonUserPosts[index].bookmarkcount = bookmarkcount
            jsonUserPosts[index].liked = liked
            jsonUserPosts[index].reposted = reposted
            jsonUserPosts[index].bookmarked = bookmarked
            ++index
        }
        return res.json(jsonUserPosts)
    } else {
        return res.json([])
    }

}

export async function getPostById(req, res, next) {
    //todo : check the req.body.username matches
    let Post = await Posts.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Posts,
            as: 'ChildPosts',
            order: [['createdAt', 'DESC']],
            include: {
                model: Users,
                as: 'User',
                attributes: ['username', 'displayname', 'bio', 'id', 'profilepicture']
            },
        },
        {
            model: Users,
            as: 'User',
            attributes: ['username', 'displayname', 'bio', 'id', 'profilepicture']
        },
        {
            model: Posts,
            as: 'ParentPost',
            include: {
                model: Users,
                as: 'User',
                attributes: ['username', 'displayname', 'bio', 'id', 'profilepicture']
            }
        }
        ]
    })

    let deepPost = Post?.ParentPost
    let holder = []
    while (deepPost) {
        let deepPostJson = deepPost.toJSON()
        let [likecount, commentcount, repostcount, bookmarkcount, liked, reposted, bookmarked] = await postDetailer(deepPost, { body: { id: req.user?.id } })
        deepPostJson.commentcount = commentcount
        deepPostJson.likecount = likecount
        deepPostJson.repostcount = repostcount
        deepPostJson.bookmarkcount = bookmarkcount
        deepPostJson.liked = liked
        deepPostJson.reposted = reposted
        deepPostJson.bookmarked = bookmarked
        holder.push(deepPostJson)
        deepPost = await deepPost.getParentPost({
            include: {
                model: Users,
                as: 'User'
            }
        })
    }

    if (Post) {
        let jsonPost = Post.toJSON()
        //set comment count for each child post
        let index = 0
        for (const element of Post.ChildPosts) {
            let [likecount, commentcount, repostcount, bookmarkcount, liked, reposted, bookmarked] = await postDetailer(element, { body: { id: req.user?.id } })
            jsonPost.ChildPosts[index].commentcount = commentcount
            jsonPost.ChildPosts[index].likecount = likecount
            jsonPost.ChildPosts[index].repostcount = repostcount
            jsonPost.ChildPosts[index].bookmarkcount = bookmarkcount
            jsonPost.ChildPosts[index].liked = liked
            jsonPost.ChildPosts[index].reposted = reposted
            jsonPost.ChildPosts[index].bookmarked = bookmarked
            ++index
        }
        //add array of parentposts
        delete jsonPost['ParentPost']
        jsonPost['ParentPosts'] = holder.reverse()

        //count length of ChildPosts array 
        // jsonPost.commentcount = jsonPost.ChildPosts.length
        let [likecount, commentcount, repostcount, bookmarkcount, liked, reposted, bookmarked] = await postDetailer(Post, { body: { id: req.user?.id } })
        jsonPost.likecount = likecount
        jsonPost.commentcount = commentcount
        jsonPost.repostcount = repostcount
        jsonPost.bookmarkcount = bookmarkcount
        jsonPost.liked = liked
        jsonPost.reposted = reposted
        jsonPost.bookmarked = bookmarked
        return res.json(jsonPost)
    } else {
        return res.json(null)
    }
}

export async function addNewPost(req, res, next) {
    try {
        let parentPost = null
        if (req.body.parentpostid) {
            parentPost = await Posts.findByPk(req.body.parentpostid, {
                include: {
                    model: Users,
                    as: 'User',
                    attributes: ['id', 'username']
                }
            })
            if (!parentPost) {
                return res.status(404).json({ message: "Parent post doesn't exist" })
            }
        }

        if(req.body.content.length > 1200){
            throw new Error('Max length exceeded.')
        }

        let newPost = await Posts.create({
            content: req.body.content,
            UserId: req.user.id,
            parentpostid: req.body.parentpostid == 0 ? null : req.body.parentpostid,
            media: req.file ? req.file.filename : null,
            mediatype: req.file ? req.file.mimetype : null
        })

        //create notification
        //only when there is a parent and that parent is not @aloo bot
        if (req.body.parentpostid && parentPost.User.id != 1) {
            let fromuser = await Users.findByPk(req.user.id)

            //dont create notification on reply from the OP himself
            if (req.user.id != parentPost.User.id) {

                let newnotification = await Notifications.create(
                    {
                        type: "reply",
                        message: `${fromuser.username} replied ${req.body.content.slice(0, 50)}...`,
                        isRead: false,
                        NotifiedUserId: parentPost.User.id,
                        NotifPostId: newPost.id,
                        NotifierUserId: req.user.id
                    }
                )

            }
        }

        //save hash of the post
        await Hashs.create({ hash: req.hashed, PostId: newPost.id })

        setTimeout(async () => {
            //check if user created a new post or text has tagged AI or replying to ai
            if (parentPost == null ||  req.body.content.includes("@aloo") || (parentPost && parentPost.User.id == 1)) {
                let text = ''
                if (parentPost == null) {
                    text = req.body.content
                } else if (parentPost.id == 1) {
                    text = `You posted this = ${parentPost.content}\n. Someone replied to you with this = ${req.body.content}. Write your reply.`
                } else {
                    text = `Someone posted this = ${parentPost.content}.\n Now someone else is asking you this = ${req.body.content}. Write your reply.`
                }

                await Posts.create({
                    content: await getGeminiResponse(text),
                    UserId: 1, //set to 24 for prod , 4 for local
                    parentpostid: newPost.id,
                    media: null,
                    mediatype: null
                })
            }
        }, 100);

        //return success
        return res.json({ message: 'success' })

    } catch (err) {
        res.status(500).json(err.message)
    }
}

export async function likePost(req, res, next) {
    //check if it exist
    let likeExist = await Likes.findOne({
        where: {
            LikerUserId: req.body.userid,
            LikedPostId: req.body.postid
        }
    })

    //destroy if exist
    if (likeExist) {
        await likeExist.destroy()
        let oldnotif = await Notifications.findOne({
            where: {
                NotifierUserId: req.body.userid,
                NotifiedUserId: req.body.receiverid,
                NotifPostId: req.body.postid,
                type: "like"
            }
        })
        if (oldnotif) {
            await oldnotif.destroy()
        }
        return res.json("success")
    }

    //else create new
    let newLike = await Likes.create({
        LikerUserId: req.body.userid,
        LikedPostId: req.body.postid
    })

    //create like notification
    if (req.body.userid != req.body.receiverid) {
        let fromuser = await Users.findByPk(req.body.userid)
        let newnotification = await Notifications.create(
            {
                type: "like",
                message: `${fromuser.username} liked your post`,
                isRead: false,
                NotifiedUserId: req.body.receiverid,
                NotifPostId: req.body.postid,
                NotifierUserId: req.body.userid
            }
        )
    }

    return res.json("success")
}

export async function Repost(req, res, next) {
    //check if it exist
    let repostExist = await Reposts.findOne({
        where: {
            ReposterId: req.body.userid,
            RepostedId: req.body.postid
        }
    })

    //destroy if exist
    if (repostExist) {
        await repostExist.destroy()
        let oldnotif = await Notifications.findOne({
            where: {
                NotifierUserId: req.body.userid,
                NotifiedUserId: req.body.receiverid,
                NotifPostId: req.body.postid,
                type: "repost"
            }
        })
        if (oldnotif) {
            await oldnotif.destroy()
        }
        return res.json("success")
    }

    //else create new
    let newRepost = await Reposts.create({
        ReposterId: req.body.userid,
        RepostedId: req.body.postid
    })

    //create like notification
    if (req.body.userid != req.body.receiverid) {
        let fromuser = await Users.findByPk(req.body.userid)
        let newnotification = await Notifications.create(
            {
                type: "repost",
                message: `${fromuser.username} reposted your post`,
                isRead: false,
                NotifiedUserId: req.body.receiverid,
                NotifPostId: req.body.postid,
                NotifierUserId: req.body.userid
            }
        )
    }

    return res.json("success")
}

export async function Bookmark(req, res, next) {
    //check if it exist
    let bookmarkExist = await Bookmarks.findOne({
        where: {
            BookmarkUserId: req.body.userid,
            BookmarkPostId: req.body.postid
        }
    })

    //destroy if exist
    if (bookmarkExist) {
        bookmarkExist.destroy()
        return res.json("success")
    }

    //else create new
    let newBookmark = await Bookmarks.create({
        BookmarkUserId: req.body.userid,
        BookmarkPostId: req.body.postid
    })
    return res.json("success")
}



export async function deletePost(req, res, next) {
    if (process.env.DELETE_KEY == req.query.key) {
        let post = await Posts.findByPk(req.query.id)
        await post.destroy()
        return res.json("success")
    }else{
        return res.json("failed")
    }
}



// helper functions
async function postDetailer(post, req) {
    let likecount = await post.countLikers()
    let commentcount = await post.countChildPosts()
    let repostcount = await post.countReposters()
    let bookmarkcount = await post.countBookmarkUsers()
    let liked = false
    let reposted = false
    let bookmarked = false
    if (req.body && req.body.id) {
        liked = await post.hasLikers(req.body.id)
        reposted = await post.hasReposters(req.body.id)
        bookmarked = await post.hasBookmarkUsers(req.body.id)
    }
    return [likecount, commentcount, repostcount, bookmarkcount, liked, reposted, bookmarked]
}



