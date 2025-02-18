import { Posts } from "../models/post.model.js"
import { Users } from "../models/user.model.js"
import { Hashs } from "../models/hash.model.js"
import { sequelize } from "../models/sequelize.js"

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
        },
        {
            model: Posts,
            as: 'ChildPosts',
            attributes: ['id']
        }
        ]
    })

    if (result) {
        result = result.map(x => x.toJSON())
        result.forEach(x => {
            x.commentcount = x.ChildPosts.length
            delete x['ChildPosts']
        })
    }

    return res.status(200).json(result)
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
            let count = await element.countChildPosts()
            jsonUserPosts[index++].commentcount = count
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
            model : Posts,
            as : 'ParentPost',
            include: {
                model: Users,
                as: 'User',
            }
        }
        ]
    })

    let deepPost = Post?.ParentPost
    let holder = []
    while(deepPost){
        let deepPostJson = deepPost.toJSON()
        deepPostJson.commentcount = await deepPost.countChildPosts()
        holder.push(deepPostJson)
        deepPost = await deepPost.getParentPost({
            include : {
                model : Users,
                as : 'User'
            }
        })
    }

    if (Post) {
        let jsonPost = Post.toJSON()
        //set comment count for each child post
        let index = 0
        for (const element of Post.ChildPosts) {
            let count = await element.countChildPosts();
            jsonPost.ChildPosts[index++].commentcount = count
        }
        // if(Post.ParentPost){
        //     let count = await Post.ParentPost.countChildPosts()
        //     jsonPost.ParentPost.commentcount = count
        // }

        //add array of parentposts
        delete jsonPost['ParentPost']
        jsonPost['ParentPosts'] = holder.reverse()

        //count length of ChildPosts array 
        jsonPost.commentcount = jsonPost.ChildPosts.length
        return res.json(jsonPost)
    } else {
        return res.json(null)
    }
}

export async function addNewPost(req, res, next) {
    console.log(req.body)
    if(req.body.parentpostid){
        let parentPost = await Posts.findByPk(req.body.parentpostid)
        if(!parentPost){
            return res.status(404).json({message : "Parent post doesn't exist"})
        }
    }
    try {
        let newPost = await Posts.create({
            content: req.body.content,
            UserId: req.body.id,
            parentpostid: req.body.parentpostid == 0 ? null : req.body.parentpostid,
            media : req.file ? req.file.filename : null,
            mediatype : req.file ? req.file.mimetype : null
        })

        await Hashs.create({ hash: req.hashed, PostId: newPost.id })
        return res.json({message : 'success'})
    } catch (err) {
        res.status(500).json(err.message)
    }
}



