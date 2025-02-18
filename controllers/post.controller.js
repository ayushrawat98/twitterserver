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

    if (Post) {
        let jsonPost = Post.toJSON()
        let index = 0
        for (const element of Post.ChildPosts) {
            let count = await element.countChildPosts();
            jsonPost.ChildPosts[index++].commentcount = count
        }
        if(Post.ParentPost){
            let count = await Post.ParentPost.countChildPosts()
            jsonPost.ParentPost.commentcount = count
        }
        jsonPost.commentcount = jsonPost.ChildPosts.length
        return res.json(jsonPost)
    } else {
        return res.json([])
    }
}

export async function addNewPost(req, res, next) {
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
            parentpostid: req.body.parentpostid
        })

        await Hashs.create({ hash: req.hashed, PostId: newPost.id })
        return res.json(newPost)
    } catch (err) {
        res.status(500).json(err.message)
    }
}



