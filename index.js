const express = require('express')

let posts = [];

const app = express()
app.use(express.json())

// 전체 글 조회
app.get('/posts', function (req, res) {
  res.send(posts)
});

// 특정 글 조회
app.get('/posts/:id', function (req, res) {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  res.send(post);
});

// 글 작성 
app.post('/posts', (req, res) => {
  const newPost = req.body;
  const ids = posts.map((post) => post.id);
  let postId;
  if (ids.length===0){
    postId = 0
  } else {
    postId = Math.max(...ids) + 1;
  }
  newPost.id = postId;
  newPost.createdAt = new Date();
  newPost.updatedAt = new Date();

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
    res.sendStatus(204);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));