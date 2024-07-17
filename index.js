const express = require('express');
const db = require('./db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let posts = []; // 게시글 저장
let comments = {}; // 댓글 저장
let likes = {}; // 게시글 별로 좋아요 누른 사용자 저장
let currentUserId = null;

const app = express();
app.use(express.json());

// 전체 글 조회
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM Posts', (error, results) => {
    if (error) {
      return res.status(500).send({ message: "Server Error" });
    }
    res.send(results);
  });
});

function getLikeCount(postId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) AS like_count FROM Likes WHERE post_id = ?', [postId], (error, results) => {
      if (error) {
        return reject(error);
      }
      const likes = results[0].like_count;
      resolve(likes);
    });
  });
}

function getComments(postId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT user_id, content, created_at FROM Comments WHERE post_id = ?', [postId], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

// 특정 글 조회 (댓글, 좋아요 포함)
app.get('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  db.query('SELECT * FROM Posts WHERE post_id = ?', [postId], async (error, results) => {
    if (error) {
      return res.status(500).send({ message: "Server Error" });
    }
    if (results.length===0) {
      return res.status(404).send({ message: 'Cannot find given post id.' });
    }
    
    const post = results[0];
    post.likes = await getLikeCount(postId);
    post.comments = await getComments(postId);

    res.send(post);
  });
});

// 글 작성 
app.post('/posts', (req, res) => {
  const newPost = req.body;
  if (!currentUserId) {
    return res.status(404).send({ message: 'You have to login first to upload a post' });
  }
  db.query('INSERT INTO Posts (user_id, title, content) VALUES (?, ?, ?)', [currentUserId, newPost.title, newPost.content], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Failed to upload a post..' });
    }
    res.status(201).send({ message: 'Post uploaded succesfully' });
  });
});

// 글 수정
app.patch('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const { title, content } = req.body;
  db.query('SELECT * FROM Posts WHERE post_id = ?', [postId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: "Server Error" });
    }
    if (results.length===0) {
      return res.status(404).send({ message: 'Cannot find given post id.' });
    }

    // 수정되지 않은 것은 기존 내용 그대로
    const updatedTitle = title !== undefined ? title : results[0].title;
    const updatedContent = content !== undefined ? content : results[0].content;

    console.log(updatedTitle, updatedContent);
    db.query('UPDATE Posts SET title = ?, content = ? WHERE post_id = ?', [updatedTitle, updatedContent, postId], (error, results) => {
      if (error) {
        return res.status(500).send({ message: "Server Error" });
      }
      res.send({ message: 'Post updated successfully!' });
    });
  });
});

// 글 삭제
app.delete('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  db.query('DELETE FROM Posts WHERE post_id = ?', [postId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: "Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Cannot find given post id' });
    }
    res.status(204).send({ message: 'Post deleted succesfully!' })
  })
});

// 게시글 좋아요 & 좋아요 취소
app.post('/posts/:id/like', (req, res)=> {
  const postId = Number(req.params.id);
  if (!currentUserId) {
    return res.status(404).send({ message: 'You have to login first to like a post' });
  }
  db.query('SELECT * FROM Posts WHERE post_id = ?', [postId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length===0) {
      return res.status(404).send({ message: 'Cannot find given post id.' });
    }
    db.query('SELECT * FROM Likes WHERE post_id = ? AND user_id = ?', [postId, currentUserId], (error, results) => {
      if (error) {
        return res.status(500).send({ message: 'Server Error' });
      }
      if (results.length===0) {
        db.query('INSERT INTO Likes (post_id, user_id) VALUES (?, ?)', [postId, currentUserId], (error, results) => {
          if (error) {
            return res.status(500).send({ message: 'Server Error' });
          }
          res.send({ message: 'Post liked successfully!'});
        });
      } else {
        db.query('DELETE FROM Likes WHERE post_id = ? AND user_id = ?', [postId, currentUserId], (error, results) => {
          if (error) {
            return res.status(500).send({ message: 'Server Error' });
          }
          res.send({ message: 'Post unliked successfully!'});
        });
      }
    });
  });
});

// 댓글
app.post('/posts/:id/comment', (req, res) => {
  const postId = Number(req.params.id);
  const { comment } = req.body;
  if (!currentUserId) {
    return res.status(404).send({ message: 'You have to login first to like a post' });
  }
  db.query('SELECT * FROM Posts WHERE post_id = ?', [postId], (error, results) => {
    if (error) {
      return res.status(500).send({ message: 'Server Error' });
    }
    if (results.length===0) {
      return res.status(404).send({ message: 'Cannot find given post id.' });
    }
    db.query('INSERT INTO Comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, currentUserId, comment], (error, results) => {
      if (error) {
        return res.status(500).send({ message: 'Server Error' });
      }
      res.send({ message: 'Comment posted successfully' });
    });
  });
});

// 아이디 중복 체크
function idDuplicateCheck(userId) {
  return new Promise((resolve, reject) => {
    db.query("SELECT user_id FROM Users WHERE user_id = ?", [userId], (error, results) => {
    if (error) {
      return reject(error);
    } 

    if(results.length===0) {
      resolve(false);
    } else {
      resolve(true);
    }
    });
  });  
};

// 이메일 중복 체크
function emailDuplicateCheck(email) {
  return new Promise((resolve, reject) => {
    db.query("SELECT email FROM Users WHERE email = ?", [email], (error, results) => {
    if (error) {
      return reject(error);
    } 

    if(results.length===0) {
      resolve(false);
    } else {
      resolve(true);
    }
    });
  });  
};

// 회원 가입
app.post('/signup', async (req, res) => {
  const userInfo = req.body;
  const isIdDuplicate = await idDuplicateCheck(userInfo.userId);
  const isEmailDuplicate = await emailDuplicateCheck(userInfo.email);
  if (isIdDuplicate){
    res.send({ message: '중복된 아이디 입니다!' });
  } else if (isEmailDuplicate) {
    res.send({ message: '중복된 이메일 입니다!' });
  } else {
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
    db.query("INSERT INTO Users (user_id, email, password) VALUES (?, ?, ?)", [userInfo.userId, userInfo.email, hashedPassword], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send({ message: '회원가입 완료!' });
    });
  }
});

// 로그인
app.post('/login', async (req, res) => {
  const { userId, password } = req.body;

  db.query("SELECT * FROM Users WHERE user_id = ?", [userId], async (error, results) => {
    if (error) {
      return res.status(500).send({ message: "Server Error" });
    }
    if (results.length===0) {
      return res.status(400).send({ message: "Wrong user ID!" });
    } 

    const isPasswordCorrect = await bcrypt.compare(password, results[0].password);
    if (isPasswordCorrect) {
      currentUserId = userId;
      res.send({ message: 'Login Succeeded!' });
    } else {
      res.status(401).send({ message: 'Wrong password!' });
    }
  });
});

// 로그아웃
app.get('/logout', (req, res) => {
  currentUserId = null;
  res.send({ message: 'Logout Succeeded!' });
});

app.listen(3000, () => console.log('Server Started'));