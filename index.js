const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');
require('dotenv').config();

const db = require('./models/index');
const { User, Post, Comment, Like } = db;

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// 전체 글 조회
app.get('/posts', async (req, res) => {
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
  });
  res.send(posts);
});

// 특정 글 조회 (댓글, 좋아요 포함)
app.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findOne({
    where: { postId },
    include: [
      {
        model: Comment,
        attributes: ['userId', 'content', 'createdAt'],
      },
    ],
  });
  const likes = await Like.count({ where: { postId } });
  post.dataValues.likes = likes;
  res.send(post);
});

// 글 작성 
app.post('/posts', async (req, res) => {
  const newPost = req.body;
  if (!req.session.userId) {
    return res.status(404).send({ message: 'You have to login first to upload a post' });
  }
  const post = await Post.create({
    userId: req.session.userId,
    title: newPost.title,
    content: newPost.content
  });
  res.send(post);
});

// 글 수정
app.patch('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const updatedPost = req.body;
  const post = await Post.findOne({ where: { postId } })

  if (!post) {
    return res.status(404).send({ message: 'Cannot find given post id.' });
  }
  if (post.userId!==req.session.userId) {
    return res.status(404).send({ message: 'You cannot update this post' });
  }

  await Post.update(updatedPost, { where: { postId } });
  res.send({ message: 'Post updated successfully!' });
});

// 글 삭제
app.delete('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findOne({ where: { postId } });
  if (!post) {
    return res.status(404).send({ message: 'Cannot find given post id.' });
  }
  if (post.userId!==req.session.userId) {
    return res.status(404).send({ message: 'You cannot delete this post' });
  }

  const deletedCount = await Post.destroy({ where: { postId } });
  if (deletedCount>0) {
    res.status(204).send();
  } else {
    res.send(404). send({ message:  'Cannot find given post id.' });
  }
});

// 게시글 좋아요 & 좋아요 취소
app.post('/posts/:id/like', async (req, res)=> {
  const postId = req.params.id;
  const post = await Post.findOne({ where: { postId }});

  if (!req.session.userId) {
    return res.status(404).send({ message: 'You have to login first to like a post' });
  }

  if (!post) {
    return res.status(404).send({ message: 'Cannot find given post id.' });
  }

  const isLiked = await Like.findOne({
    where: {
      postId,
      userId: req.session.userId,
    }
  });
  if (!isLiked) {
    await Like.create({
      postId,
      userId: req.session.userId,
    });
    res.send({ message: 'Post liked successfully!'});
  } else {
    await Like.destroy({
      where: {
        postId,
        userId: req.session.userId,
      }
    });
    res.send({ message: 'Post unliked successfully!'});
  }
});

// 댓글
app.post('/posts/:id/comment', async (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  const post = await Post.findOne({ where: { postId }});

  if (!req.session.userId) {
    return res.status(404).send({ message: 'You have to login first to write comment to a post' });
  }
  if (!post) {
    return res.status(404).send({ message: 'Cannot find given post id.' });
  }

  await Comment.create({
    postId,
    userId: req.session.userId,
    content: comment,
  })
  res.send({ message: 'Comment posted successfully' });
});

// 회원 가입
app.post('/signup', async (req, res) => {
  const { userId, email, password } = req.body;

  const isIdDuplicate = await User.findOne({ where: { userId }});
  if (isIdDuplicate) {
    return res.send({ message: 'User ID already exists' });
  }

  const isEmailDuplicate = await User.findOne({ where: { email }});
  if (isEmailDuplicate) {
    return res.send({ message: 'Your email already is already used' });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    userId,
    email,
    password: hashedPassword
  });

  res.status(201).send({ message: 'Registration Complete!' });
});

// 로그인
app.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ where: { userId }});

  if (!user) {
    return res.status(400).send({ message: "Invalid user ID!" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (isPasswordCorrect) {
    req.session.userId = userId;
    res.send({ message: 'Login Succeeded!' });
  } else {
    res.status(401).send({ message: 'Invalid password!' });
  }
});

// 로그아웃
app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.send({ message: 'Error logging out' });
    }
  });
  res.send({ message: 'Logout Succeeded!' });
});

app.listen(3000, () => console.log('Server Started'));