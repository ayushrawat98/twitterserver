import { Posts } from "../models/post.model.js"
import { Users } from "../models/user.model.js"
import { Hashs } from "../models/hash.model.js"
import { Likes } from "../models/like.model.js"

export async function getAllPosts(req, res, next) {

    let result = await Posts.findAll({
        where: {
            deleted: false,
            parentpostid: null
        },
        limit: 20,
        order: [['createdAt', 'DESC']],
        include: [{
            model: Users,
            as: 'User',
        }
        ]
    })

   
    if (result) {
        let resultJson = result.map(x => x.toJSON())
        let index = 0
        for(let x of result){
            let [likecount, commentcount] = await postDetailer(x)
            resultJson[index].likecount = likecount
            resultJson[index].commentcount = commentcount
            ++index
        }
        return res.status(200).json(resultJson)
    }else{
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
            }
        }
    })

    if (User) {
        let jsonUserPosts = User.toJSON().UserPosts
        let index = 0
        for (const element of User.UserPosts) {
            let [likecount, commentcount] = await postDetailer(element)
            jsonUserPosts[index].commentcount = commentcount
            jsonUserPosts[index].likecount = likecount
            ++index
        }
        return res.json(jsonUserPosts)
    } else {
        return res.json([])
    }

}

export async function getUserPostById(req, res, next) {
    //todo : check the req.body.username matches
    let Post = await Posts.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Posts,
            as: 'ChildPosts',
            include: {
                model: Users,
                as: 'User',
            },
        },
        {
            model: Users,
            as: 'User',
        },
        {
            model: Posts,
            as: 'ParentPost',
            include: {
                model: Users,
                as: 'User',
            }
        }
        ]
    })

    let deepPost = Post?.ParentPost
    let holder = []
    while (deepPost) {
        let deepPostJson = deepPost.toJSON()
        let [likecount, commentcount] = await postDetailer(deepPost)
        deepPostJson.commentcount = commentcount
        deepPostJson.likecount = likecount
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
            let [likecount, commentcount] = await postDetailer(element)
            jsonPost.ChildPosts[index].commentcount = commentcount
            jsonPost.ChildPosts[index].likecount = likecount
            ++index
        }
        //add array of parentposts
        delete jsonPost['ParentPost']
        jsonPost['ParentPosts'] = holder.reverse()

        //count length of ChildPosts array 
        jsonPost.commentcount = jsonPost.ChildPosts.length
        jsonPost.likecount = await Post.countLikers()
        return res.json(jsonPost)
    } else {
        return res.json(null)
    }
}

export async function addNewPost(req, res, next) {
    if (req.body.parentpostid) {
        let parentPost = await Posts.findByPk(req.body.parentpostid)
        if (!parentPost) {
            return res.status(404).json({ message: "Parent post doesn't exist" })
        }
    }

    try {
        let newPost = await Posts.create({
            content: req.body.content,
            UserId: req.body.id,
            parentpostid: req.body.parentpostid == 0 ? null : req.body.parentpostid,
            media: req.file ? req.file.filename : null,
            mediatype: req.file ? req.file.mimetype : null
        })

        await Hashs.create({ hash: req.hashed, PostId: newPost.id })
        return res.json({ message: 'success' })
    } catch (err) {
        res.status(500).json(err.message)
    }
}

export async function likePost(req, res, next) {
    let newLike = await Likes.create({
        LikerUserId: req.body.userid,
        LikedPostId: req.body.postid
    })
    return res.json('done')
}


// helper functions
async function postDetailer(post){
    let likecount = await post.countLikers()
    let commentcount = await post.countChildPosts()
    return [likecount , commentcount]
}

