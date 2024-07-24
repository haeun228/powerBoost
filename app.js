const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const { Op } = require('sequelize');
require('dotenv').config();
const {
  generateAccessToken,
  authenticateToken,
} = require('./jwt.js');

const db = require('./models/index');
const { User, Post, Comment, Like } = db;

const app = express();
app.use(express.json());
app.use(cookieParser());

class PostNotFoundError extends Error {}
class UserNotAuthorizedError extends Error {}

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e instanceof PostNotFoundError) {
        res.status(400).send({ message: 'Cannot find given post id.' });
      } else if (e instanceof UserNotAuthorizedError) {
        res.status(401).send({ message: 'You cannot edit/delete this post!' });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

// 전체 글 조회
app.get('/posts', asyncHandler(async (req, res) => {
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
  });
  res.send(posts);
}));

// 게시물 검색
app.get('/posts/search', asyncHandler(async (req, res) => {
  const { query, option } = req.query;

  if (!query) {
    return res.status(400).send({ message: 'Search query is required' });
  }

  // option에 검색 범위 설정. 기본값은 제목과 내용 모두 검색
  let whereCondition = {};
  if (option === 'title') {
    whereCondition = { title: { [Op.like]: `%${query}%` } };
  } else if (option === 'content') {
    whereCondition = { content: { [Op.like]: `%${query}%` } };
  } else {
    whereCondition = {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } }
      ]
    };
  }

  const posts = await Post.findAll({
    where: whereCondition,
    order: [['createdAt', 'DESC']]
  });

  res.send(posts);
}));

// 특정 글 조회 (댓글, 좋아요 포함)
app.get('/posts/:id', asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findByPk(postId, {
    include: [
      {
        model: Comment,
        attributes: ['userId', 'content', 'createdAt'],
      },
    ],
  });
  if (!post) throw new PostNotFoundError();

  const likes = await Like.count({ where: { postId } });
  post.dataValues.likes = likes;
  res.send(post);
}));

// 글 작성 
app.post('/posts', authenticateToken, asyncHandler(async (req, res) => {
  const newPost = req.body;
  const post = await Post.create({
    userId: req.userId,
    title: newPost.title,
    content: newPost.content
  });
  res.send(post);
}));

// 글 수정
app.patch('/posts/:id', authenticateToken, asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const updatedPost = req.body;
  const post = await Post.findByPk(postId);

  if (!post) throw new PostNotFoundError();
  if (post.userId!==req.userId) throw new UserNotAuthorizedError();

  await Post.update(updatedPost, { where: { postId } });
  res.send({ message: 'Post updated successfully!' });
}));

// 글 삭제
app.delete('/posts/:id', authenticateToken, asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findByPk(postId);

  if (!post) throw new PostNotFoundError();
  if (post.userId!==req.userId) throw new UserNotAuthorizedError();
  
  await Post.destroy({ where: { postId } });
  res.status(204).send();
}));

// 게시글 좋아요 & 좋아요 취소
app.post('/posts/:id/like', authenticateToken, asyncHandler(async (req, res)=> {
  const postId = req.params.id;
  const post = await Post.findByPk(postId);

  if (!post) throw new PostNotFoundError();

  const isLiked = await Like.findOne({
    where: {
      postId,
      userId: req.userId,
    }
  });
  if (!isLiked) {
    await Like.create({
      postId,
      userId: req.userId,
    });
    res.send({ message: 'Post liked successfully!'});
  } else {
    await Like.destroy({
      where: {
        postId,
        userId: req.userId,
      }
    });
    res.send({ message: 'Post unliked successfully!'});
  }
}));

// 댓글
app.post('/posts/:id/comment', authenticateToken, asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  const post = await Post.findByPk(postId);

  if (!post) throw new PostNotFoundError();

  await Comment.create({
    postId,
    userId: req.userId,
    content: comment,
  })
  res.send({ message: 'Comment posted successfully' });
}));

// 회원 가입
app.post('/signup', asyncHandler(async (req, res) => {
  const { userId, email, password } = req.body;

  const isIdDuplicate = await User.findOne({ where: { userId }});
  if (isIdDuplicate) {
    return res.send({ message: 'User ID already exists' });
  }

  const isEmailDuplicate = await User.findOne({ where: { email }});
  if (isEmailDuplicate) {
    return res.send({ message: 'Your email is already used' });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await User.create({
    userId,
    email,
    password: hashedPassword
  });

  res.status(201).send({ message: 'Registration Complete!' });
}));

// 로그인
app.post('/login', asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ where: { userId }});

  if (!user) {
    return res.status(400).send({ message: "Invalid user ID!" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (isPasswordCorrect) {
    const accessToken = generateAccessToken(user.userId);
    
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      // secure: true, // 로컬호스트에서 실행해보려면 주석 처리
      maxAge: 10 * 60 * 1000 // 10분
    });

    res.send({ message: 'Login Succeeded!', user: userId });
  } else {
    res.status(401).send({ message: 'Invalid password!' });
  }
}));

// 로그아웃
app.get('/logout', asyncHandler((req, res) => {
  res.clearCookie('accessToken');
  res.send({ message: 'Logout Succeeded!' });
}));

// 스크랩 조회 (좋아요 한 게시글 조회)
app.get('/scrap', authenticateToken, asyncHandler(async (req, res) => {
  const likedPosts = await Like.findAll({
    where: { userId: req.userId },
    include: [{
      model: Post,
    }],
  });

  res.send(likedPosts.map(likes => likes.Post));
}));

app.listen(3000, () => console.log('Server Started'));