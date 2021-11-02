const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/home', async (req, res) => {
  const postData = await Post.findAll();

  const posts = postData.map((value) => value.get({ plain: true }));

  res.render('posts', { posts: posts, navInfo: { page: "home", loggedIn: req.session.logged_in } });
});

// Prevent non logged in users from viewing the homepage
router.get('/dashboard', withAuth, async (req, res) => {
  try {

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });

    const posts = postData.map((value) => value.get({ plain: true }));

    res.render('posts', { posts: posts, navInfo: { page: "dashboard", loggedIn: req.session.logged_in } });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/editPost/:id', withAuth, async (req, res) => {
  try {

    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      }
    });

    let user = userData.get({ plain: true });

    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      }
    });

    let post = postData.get({ plain: true });


    res.render('post-edit', { newPost: false, post: post, user: user, editType: "PUT", navInfo: { page: "dashboard", loggedIn: req.session.logged_in }});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/editPost', withAuth, async (req, res) => {
  try {

    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      }
    });

    let user = userData.get({ plain: true });

    res.render('post-edit', { newPost: true, post: { title: "", content: "" }, user: user, editType: "POST", navInfo: { page: "dashboard", loggedIn: req.session.logged_in }});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', { navInfo: { page: "login", loggedIn: req.session.logged_in } });
});

router.get('/create-user', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('create-user', { navInfo: { page: "create-acc", loggedIn: req.session.logged_in } });

});

router.get('/', (req, res) => {
  res.redirect('/home');
});

module.exports = router;
