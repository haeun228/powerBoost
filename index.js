const express = require('express')

let posts = []; // 게시글 저장
let comments = {}; // 댓글 저장
let likes = {}; // 게시글 별로 좋아요 누른 사용자 저장

const app = express()
app.use(express.json())

// 전체 글 조회
app.get('/posts', function (req, res) {
  res.send(posts)
});

// 특정 글 조회 (댓글, 좋아요 포함)
app.get('/posts/:id', function (req, res) {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (post) {
    const detailedPost = { ...post };
    detailedPost.comments = comments[id];
    detailedPost.likes = likes[id];
    res.send(detailedPost);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

// 글 작성 
app.post('/posts', (req, res) => {
  const newPost = req.body;
  const ids = posts.map((post) => post.id);
  let postId;
  if (ids.length===0){
    postId = 1
  } else {
    postId = Math.max(...ids) + 1;
  }
  newPost.id = postId;
  newPost.createdAt = new Date();
  newPost.updatedAt = new Date();

  likes[postId] = [];
  comments[postId] = [];

  posts.push(newPost);
  res.status(201).send(newPost);
});

// 글 수정
app.patch('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (post) {
    Object.keys(req.body).forEach((key) => {
      post[key] = req.body[key];
    });
    post.updatedAt = new Date();
    res.send(post);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

// 글 삭제
app.delete('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = posts.findIndex((post) => post.id === id);
  if (idx>=0) {
    posts.splice(idx, 1);
    delete likes[id];
    delete comments[id];
    res.sendStatus(204);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

// 게시글 좋아요 & 좋아요 취소
app.post('/posts/:id/like', (req, res)=> {
  const postId = Number(req.params.id);
  const post = posts.find((post) => post.id === postId);
  const { userId } = req.body;
  
  if (post) {
    const idx = likes[postId].indexOf(userId);
    if (idx >= 0) {
      likes[postId].splice(idx, 1);
      res.send({ message: `User "${userId}" unliked the post.`});
    } else {
      likes[postId].push(userId);
      res.send({ message: `User "${userId}" liked the post.`});
    }
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

// 댓글
app.post('/posts/:id/comment', (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((post) => post.id === postId);
  const newComment = req.body;

  if (post) {
    comments[postId].push(newComment);
    res.send(comments[postId]);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));