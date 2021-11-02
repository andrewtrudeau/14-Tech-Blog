const router = require('express').Router();
const { Post } = require('../../models');

// All posts
router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll();
        const posts = postsData.map((project) => project.get({ plain: true }));
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ status: err })
    }
});

// Single post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
        });
        const post = postData.get({ plain: true });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ status: err })
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        //  Post:
        //      title:STRING
        //      content:STRING
        //      user_id:INT
        //      date_created:STRING
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (err) {
        console.log("ASDDDDDDDDDDDDDDDDDD", err)
        res.status(400).json({ status: err })
    }
});

// Update post
router.put('/:id', async (req, res) => {
    try {

        let editPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                date_edited: req.body.date_created,
            },
            { where: { id: req.params.id } }
        )

        res.status(200).json(editPost);

    } catch (err) {
        res.status(400).json({ status: err })
    }
});

// Delete post (I didn't want to handle a fetch for delete so I did it in a get)
// I am exhausted with this HW and I want to go to bed
router.get('/delete/:id', async (req, res) => {
    try {

        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
        });

        await postData.destroy();

        res.redirect('/dashboard')
    } catch (err) {
        res.status(400).json({ status: err })
    }
});

module.exports = router;
