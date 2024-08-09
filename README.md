# powerBoost Study
## 이화여대 파워부스트 스터디

### 1주차 : DB 없는 간단한 게시판 만들기
- 글 작성/조회/수정/삭제 기능
- 게시글 좋아요 기능
- 댓글 기능 

#### GET /posts
- 전체 게시글 조회하기
- Request:
    ```
    GET http://localhost:3000/posts
    ```
- Response: 
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 286
    ETag: W/"11e-DhBiGHf1E89v8kyJv9s5hdP4TQI"
    Date: Mon, 08 Jul 2024 05:58:32 GMT
    Connection: close
    
    [
      {
        "userId": "ewhain",
        "title": "제목",
        "content": "내용",
        "id": 1,
        "createdAt": "2024-07-08T05:58:18.311Z",
        "updatedAt": "2024-07-08T05:58:18.311Z"
      },
      {
        "userId": "ewhain2",
        "title": "제목2",
        "content": "내용2",
        "id": 2,
        "createdAt": "2024-07-08T05:58:30.491Z",
        "updatedAt": "2024-07-08T05:58:30.491Z"
      }
    ]
    ```
    
#### GET /posts/:id
- 특정 글 조회하기
- Request:
    ```
    GET http://localhost:3000/posts/1
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 270
    ETag: W/"10e-IG6rYuoo0NMava6VMe2T6w3Xwjo"
    Date: Mon, 08 Jul 2024 06:15:09 GMT
    Connection: close
    
    {
      "userId": "ewhain",
      "title": "제목",
      "content": "내용",
      "id": 1,
      "createdAt": "2024-07-08T06:14:28.305Z",
      "updatedAt": "2024-07-08T06:14:28.305Z",
      "comments": [
        {
          "userId": "hehe",
          "content": "글이 좋아요"
        },
        {
          "userId": "ewhain2",
          "content": "글이 좋아요"
        }
      ],
      "likes": [
        "ewhain2"
      ]
    }
    ```

#### POST /posts/:id
- 글 작성하기
- Request:
    ```
    POST http://localhost:3000/posts
    Content-Type: application/json
    
    {
        "userId": "ewhain3",
        "title": "제목3",
        "content": "내용3"
    }
    ```
- Response:
    ```
    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 143
    ETag: W/"8f-KiIZOl7AdEEHFg7NEkYLwgowbdk"
    Date: Mon, 08 Jul 2024 06:17:44 GMT
    Connection: close
    
    {
      "userId": "ewhain3",
      "title": "제목3",
      "content": "내용3",
      "id": 3,
      "createdAt": "2024-07-08T06:17:44.635Z",
      "updatedAt": "2024-07-08T06:17:44.635Z"
    }
    ```

#### PATCH /posts/:id
- 글 수정하기
- Request:
    ```
    PATCH http://localhost:3000/posts/1
    Content-Type: application/json
    
    {
        "title": "제목1",
        "content": "내용1"
    }
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 142
    ETag: W/"8e-sSeWUus914tQoRREaGfK+Lw5VYQ"
    Date: Mon, 08 Jul 2024 06:19:38 GMT
    Connection: close
    
    {
      "userId": "ewhain",
      "title": "제목1",
      "content": "내용1",
      "id": 1,
      "createdAt": "2024-07-08T06:14:28.305Z",
      "updatedAt": "2024-07-08T06:19:38.470Z"
    }
    ```

#### DELETE /posts/:id
- 글 삭제하기
- Request:
    ```
    DELETE http://localhost:3000/posts/1
    ```
- Response:
    ```
    HTTP/1.1 204 No Content
    X-Powered-By: Express
    ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
    Date: Mon, 08 Jul 2024 06:21:09 GMT
    Connection: close
    ```

#### POST /posts/:id/like
- 게시글 좋아요 하기
- Request:
    ```
    POST http://localhost:3000/posts/1/like
    Content-Type: application/json
    
    {
        "userId": "ewhain2"
    }
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 46
    ETag: W/"2e-xWtiiJ4YEGjggVTbgA1Mmq9qDeg"
    Date: Mon, 08 Jul 2024 06:24:11 GMT
    Connection: close
    
    {
      "message": "User \"ewhain2\" liked the post."
    }
    ```

#### POST /posts/:id/comment
- 댓글 작성하기
- Request:
    ```
    POST http://localhost:3000/posts/1/comment
    Content-Type: application/json
    
    {
        "userId": "ewhain2",
        "content": "글이 좋아요"
    }
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 51
    ETag: W/"33-M+3iMtnZNOO2MrhcK2+CFqb56Bs"
    Date: Mon, 08 Jul 2024 06:25:40 GMT
    Connection: close
    
    [
      {
        "userId": "ewhain2",
        "content": "글이 좋아요"
      }
    ]
    ```
#### 💡1주차
- app.use(express.json()) 사용하는 것을 잊지 말 것!
    - express.json() : JSON 형식의 HTTP 요청 body를 자동을 parsing 해주는 미들웨어 (req.body 로 접근 가능)
- JSON은 자바스크립트 객체와 다르게 마지막 요소 뒤에 쉼표(,)가 있으면 에러가 난다

***

### 2주차 : 게시판 DB 연결하고 로그인/로그아웃/회원가입 기능 추가하기

#### ERD
데이터베이스 관계 모델
- Users, Posts, Likes, Comments 총 4개의 테이블로 구성

  <img src="/erd.png" width="600px">
  
    - `Users` : 사용자의 정보를 저장하는 테이블
    - `Posts` : 게시글을 저장하는 테이블
    - `Comments` : 댓글을 저장하는 테이블. 댓글을 단 게시물의 아이디(`post_id`)를 저장해서 특정 게시글에 작성된 댓글을 조회할 수 있음
    - `Likes` : 좋아요 정보를 저장하는 테이블. 좋아요를 누른 게시물의 아이디(`post_id`)와 사용자의 아이디(`user_id`)를 저장

#### POST /signup
- 회원가입
- Request:
    ```
    POST http://localhost:3000/signup
    Content-Type: application/json
    
    {
        "userId": "ewhain",
        "email": "ewhain@gmail.com",
        "password": "ewha1886"
    }
    ```
- Response: 
    ```
    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 34
    ETag: W/"22-9jawSZpIALbRiGIVM9h/MrIKSo8"
    Date: Thu, 18 Jul 2024 01:20:03 GMT
    Connection: close
    
    {
      "message": "Registration Complete!"
    }
    ```
#### POST /login
- 로그인
- Request:
    ```
    POST http://localhost:3000/login
    Content-Type: application/json
    
    {
        "userId": "ewhain",
        "password": "ewha1886"
    }
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 30
    ETag: W/"1e-059NPBccFtWdhIwIWaQDI65uz9w"
    Date: Thu, 18 Jul 2024 00:44:34 GMT
    Connection: close
    
    {
      "message": "Login Succeeded!"
    }
    ```
#### GET /logout
- 로그아웃
- Request:
    ```
    GET http://localhost:3000/logout
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 31
    ETag: W/"1f-TWBmpMSxX0ArwHFAB6duvOIAaxc"
    Date: Thu, 18 Jul 2024 00:53:04 GMT
    Connection: close
    
    {
      "message": "Logout Succeeded!"
    }
    ```

#### GET /posts
- 전체 게시글 조회하기
- Request:
    ```
    GET http://localhost:3000/posts
    ```
- Response: 
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 495
    ETag: W/"1ef-7Xc0nzbiwK/dUWqBWPQ66Sq/yz0"
    Date: Wed, 17 Jul 2024 08:25:19 GMT
    Connection: close
    
    [
      {
        "post_id": 1,
        "user_id": "ewhain2",
        "title": "안녕하세요~~~",
        "content": "내용",
        "created_at": "2024-07-17T00:25:44.000Z",
        "updated_at": "2024-07-17T07:38:19.000Z"
      },
      {
        "post_id": 2,
        "user_id": "ewhain",
        "title": "안녕하세요",
        "content": "반가워요~",
        "created_at": "2024-07-17T00:26:39.000Z",
        "updated_at": "2024-07-17T00:26:39.000Z"
      }
    ]
    ```
    
#### GET /posts/:id
- 특정 글 조회하기
- Request:
    ```
    GET http://localhost:3000/posts/1
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 366
    ETag: W/"16e-bQGLfMSaJcpdUBvCpjPhdO5HBxM"
    Date: Wed, 17 Jul 2024 08:26:09 GMT
    Connection: close
    
    {
      "post_id": 1,
      "user_id": "ewhain2",
      "title": "안녕하세요~~~",
      "content": "내용",
      "created_at": "2024-07-17T00:25:44.000Z",
      "updated_at": "2024-07-17T07:38:19.000Z",
      "likes": 2,
      "comments": [
        {
          "user_id": "ewhain3",
          "content": "글이 좋아요",
          "created_at": "2024-07-17T00:27:22.000Z"
        },
        {
          "user_id": "ewhain4",
          "content": "글이 좋아요",
          "created_at": "2024-07-17T08:05:21.000Z"
        }
      ]
    }
    ```

#### POST /posts
- 글 작성하기
- 로그인 한 상태에서만 글 작성 가능
- Request:
    ```
    POST http://localhost:3000/posts
    Content-Type: application/json
    
    {
        "title": "제목3",
        "content": "내용3"
    }
    ```
- Response:
    ```
    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 39
    ETag: W/"27-iB92BjuQXcamynZ8T2tn2zsWUwU"
    Date: Wed, 17 Jul 2024 08:27:33 GMT
    Connection: close
    
    {
      "message": "Post uploaded succesfully"
    }
    ```

#### PATCH /posts/:id
- 글 수정하기
- 로그인 한 상태에서 글 작성자만 수정 가능
- Request:
    ```
    PATCH http://localhost:3000/posts/1
    Content-Type: application/json
    
    {
        "title": "제목1",
        "content": "내용1"
    }
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 40
    ETag: W/"28-ik7br7F7WPxfSvrAOsTMjOhLNbk"
    Date: Wed, 17 Jul 2024 08:28:34 GMT
    Connection: close
    
    {
      "message": "Post updated successfully!"
    }
    ```

#### DELETE /posts/:id
- 글 삭제하기
- 로그인 한 상태에서 글 작성자만 삭제 가능
- Request:
    ```
    DELETE http://localhost:3000/posts/1
    ```
- Response:
    ```
    HTTP/1.1 204 No Content
    X-Powered-By: Express
    ETag: W/"27-fhErCde0ueeaFPRoRRh6V46i6Gw"
    Date: Wed, 17 Jul 2024 08:30:20 GMT
    Connection: close
    ```

#### POST /posts/:id/like
- 게시글 좋아요 하기
- 로그인 한 상태에서만 좋아요 가능
- Request:
    ```
    POST http://localhost:3000/posts/1/like
    Content-Type: application/json
    
    {
        "userId": "ewhain2"
    }
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 46
    ETag: W/"2e-xWtiiJ4YEGjggVTbgA1Mmq9qDeg"
    Date: Mon, 08 Jul 2024 06:24:11 GMT
    Connection: close
    
    {
      "message": "User \"ewhain2\" liked the post."
    }
    ```

#### POST /posts/:id/comment
- 댓글 작성하기
- 로그인 한 상태에서만 댓글 작성 가능
- Request:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 38
    ETag: W/"26-VBsxtecpIhxxe/iLcP/DjlL1Q8Q"
    Date: Wed, 17 Jul 2024 08:32:57 GMT
    Connection: close
    
    {
      "message": "Post liked successfully!"
    }
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 41
    ETag: W/"29-GAe3lAtvi/3xNCKilBaYnXQ872s"
    Date: Wed, 17 Jul 2024 08:32:20 GMT
    Connection: close
    
    {
      "message": "Comment posted successfully"
    }
    ```

#### 💡 2주차
- `mysql` 모듈의 `db.query()` 메소드는 콜백 기반의 비동기 함수이기 때문에 콜백 함수 내에서 리턴하면 아무데도 전달되지 않음.
    - 그렇기 때문에 `db.query()`의 결과값을 이용한 함수를 만들고 싶다면 `Promise`를 사용해서 비동기 작업을 처리하면 됨
- 마찬가지로 비동기 콜백 내에서 발생하는 오류는 `try-catch`가 잡지 못하기 때문에 콜백 함수 내에서 예외 처리 해야함
- DB에서 불러온 데이터를 다루는 과정에서 비동기 작업과 Promise를 다루는 법을 더 잘 알게 된 것 같다.

***

### 3주차 : 스크랩 기능 / 게시물 검색 기능 추가 및 JWT 인증 방식으로 변경하기

#### GET /scrap
- 스크랩(좋아요) 한 게시물 조회
- 로그인 한 사용자만 이용 가능
- Request:
    ```
    GET http://localhost:3000/scrap
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Set-Cookie: accessToken=[토큰]; Max-Age=600; Path=/; Expires=Wed, 24 Jul 2024 04:50:33 GMT; HttpOnly
    Content-Type: application/json; charset=utf-8
    Content-Length: 417
    ETag: W/"1a1-I0KSS3iN44dWamvJxg+BCb7D7HM"
    Date: Wed, 24 Jul 2024 04:40:33 GMT
    Connection: close
    
    [
      {
        "postId": "ad58eaee-fd2a-4fa9-aa3c-a452163049ca",
        "userId": "ewhain",
        "title": "안녕하세요",
        "content": "모두 반가워요~",
        "createdAt": "2024-07-24T00:53:17.000Z",
        "updatedAt": "2024-07-24T00:53:17.000Z"
      },
      {
        "postId": "f359f32d-aa03-4988-97a2-d149e44c4478",
        "userId": "ewhain2",
        "title": "비가 와요",
        "content": "모두 우산 챙기세요!",
        "createdAt": "2024-07-24T00:53:17.000Z",
        "updatedAt": "2024-07-24T00:53:17.000Z"
      }
    ]
    ```
#### GET /posts/search
- 게시물 검색
- Request:
    ```
    GET http://localhost:3000/posts/search?query=비&option=title
    ```
- Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 426
    ETag: W/"1aa-rnFL97G3LtrM/UPRBB+afgCc8+I"
    Date: Wed, 24 Jul 2024 04:43:57 GMT
    Connection: close
    
    [
      {
        "postId": "9c7fc37e-10d7-4b9f-9f1a-b0e320ec91fa",
        "userId": "ewhain4",
        "title": "밖에 비 많이 오나요?",
        "content": "궁금합니다",
        "createdAt": "2024-07-24T00:53:17.000Z",
        "updatedAt": "2024-07-24T00:53:17.000Z"
      },
      {
        "postId": "f359f32d-aa03-4988-97a2-d149e44c4478",
        "userId": "ewhain2",
        "title": "비가 와요",
        "content": "모두 우산 챙기세요!",
        "createdAt": "2024-07-24T00:53:17.000Z",
        "updatedAt": "2024-07-24T00:53:17.000Z"
      }
    ]
    ```

### 내용 정리
#### <Sequelize로 DB 연동하기>
- 따로 sql문으로 테이블을 생성하고 중첩 콜백을 사용해야 해서 복잡했던 mysql 모듈 대신 sequelize를 이용해서 DB 연결하는 방식으로 변경

1. Sequelize 패키지 설치
    ```
    npm install mysql2 sequelize sequelize-cli
    ```

2. Sequelize를 사용하기 위한 디렉토리 및 파일 생성
    ```
    npx sequelize init
    ```
    - `config`, `migrations`, `models`, `seeders` 디렉토리 생성
    - `config/config.json`, `models/index.js` 파일 생성

3. `config.json` 파일 중 `development` 객체에 MySQL 서버 접속 정보 설정
    ```
    // ./config/config.json
    ...
    development: {
        username: 'root',
        password: '비밀번호',
        database: '데이터베이스이름',
        host: '127.0.0.1',
        dialect: 'mysql',
      },
    ...
    ```

4. 데이터베이스 생성
    ``` 
    npx sequelize db:create --env development
    ```

5. 마이그레이션 파일 및 모델 파일 생성
    ```
    npx sequelize model:generate --name User --attributes userId:string,email:string,password:string
    ```
    - `migrations` 디렉토리에 `[생성일자&시간]-create-user.js` 파일 생성
    - `models` 디렉토리에 `user.js` 파일 생성
    - `id` , `createdAt` , `updatedAt` 은 자동으로 생성됨
    - 생성된 파일에서 각 속성에 대한 추가적인 조건은 입력해주어야 함 (ex. unique, foreign key, default value 등)
        ``` javascript
        await queryInterface.createTable('Users', {
          userId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING
          },
          ...
        }
        ```

6. 데이터베이스에 테이블 생성하기 (마이그레이션)
    ```
    npx sequelize db:migrate
    ```
    - `migrations` 디렉토리에 있는 모든 마이그레이션 파일들을 날짜순으로 수행

7. Seed 데이터 생성하기
    ```
    npx sequelize seed:generate --name [파일이름]
    ```
    - `seeder` 디렉토리에 `[생성일자&시간]-[파일이름].js` 파일 생성
    - 코드에 실제로 넣을 seed 데이터에 해당하는 JSON 형식의 배열 추가
        ``` javascript
        module.exports = {
          // Users 테이블에 넣을 seed 데이터
          async up (queryInterface, Sequelize) {
            await queryInterface.bulkInsert('Users', [
              {
              	userId: 'haeun28',
                email: 'haeun28@email.com',
                password: '비밀번호',
              },
              ...
            ]);
          },
        
          // Users 테이블 내용 지우기
          async down (queryInterface, Sequelize) {
            await queryInterface.bulkDelete('Users', null, {});
          }
        };
        ```

8. Seed 데이터 추가하기
    ```
    npx sequelize db:seed:all
    
    // 시더 롤백
    npx sequelize db:seed:undo --seed [시더 파일 이름] // 특정 시더 롤백
    npx sequelize db:seed:undo:all // 전체 시더 롤백
    ```

9. 모델 파일 수정하기
- 마이그레이션 파일에 작성한 속성과 일관된 조건을 주기
- 옵션에 `timestamps: true`를 작성하면 자동으로 `createdAt`과 `updatedAt`을 추가하고 관리 (마이그레이션 파일에는 필드 추가 필요)
- 모델 파일에 테이블 간 관계 정의 필요
- example: 
    ``` javascript
      class Post extends Model {
        static associate(models) {
          Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId' });
          Post.hasMany(models.Comment, { foreignKey: 'postId', sourceKey: 'postId' });
          Post.hasMany(models.Like, { foreignKey: 'postId', sourceKey: 'postId' });
        }
      }
    ```

10. `models/index.js` 작성하기
    ``` javascript
    const Sequelize = require('sequelize');
    require('dotenv').config();
    
    const env = process.env.NODE_ENV || 'development';
    const config = require('../config/config.js')[env];
    
    const {
      username, password, database, host, dialect,
    } = config;
    const sequelize = new Sequelize(database, username, password, {
      host,
      dialect,
      logging: false // 쿼리 실행 시 콘솔창에 출력 안함
    });
    
    const User = require('./user')(sequelize, Sequelize.DataTypes);
    const Post = require('./post')(sequelize, Sequelize.DataTypes);
    const Comment = require('./comment')(sequelize, Sequelize.DataTypes);
    const Like = require('./like')(sequelize, Sequelize.DataTypes);
    
    const db = {};
    
    db.sequelize = sequelize;
    db.User = User;
    db.Post = Post;
    db.Comment = Comment;
    db.Like = Like;
    
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
    
    module.exports = db;
    ```
    - sequelize를 사용하여 데이터베이스와 연결, 모델을 정의 및 초기화, 모델 간의 관계를 정의 작업 처리

11. `app.js`에 불러와서 사용하기
    ``` javascript
    const db = require('./models/index');
    const { User, Post, Comment, Like } = db;
    ```

#### <JWT 토큰 인증>
``` javascript
// jwt.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('./models/index');
const { User } = db;

const SECRET_KEY = process.env.SECRET_KEY;

// 토큰 발급
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    SECRET_KEY,
    { expiresIn: "10m" }
  );
};

// 유효한 토큰인지 검증
const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return {
      ok: true,
      id: decoded.id,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message
    };
  }
};

// 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token == null) return res.status(401).send({ message: 'You have to login first!' });

  const result = verifyAccessToken(token);
  if (result.ok) {
    req.userId = result.id;

    const newToken = generateAccessToken(result.id);
    res.cookie('accessToken', newToken, {
      httpOnly: true,
      // secure: true,
      maxAge: 10*60*1000
    });
    next();
  } else {
    res.status(403).send({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  authenticateToken
};
```

- `generateAccessToken` : userId를 이용하여 토큰을 발급
- `verifyAccessToken` : 유효한 토큰인지 검증
- `authenticateToken` : 로그인 한 유저인지 검증
    - 토큰이 없다면 로그인 해야 한다는 메세지를 전송
    - 토큰이 있다면 `req.userId`에 토큰에서 추출한 id를 담고, 새로운 토큰으로 재발급
- 로그인 할 때 토큰을 발급하고 로그아웃 할 때 토큰 삭제
    ``` javascript
    // app.js
    
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
    ```
    -   사용자가 맞는 아이디와 비밀번호를 보냈다면 토큰을 발급하고 쿠키에 추가한다.
    -   로그아웃 할 때는 쿠키에 있던 토큰을 지워준다.

#### <스크랩 기능 구현>
``` javascript
app.get('/scrap', authenticateToken, asyncHandler(async (req, res) => {
  const likedPosts = await Like.findAll({
    where: { userId: req.userId },
    include: [{
      model: Post,
    }],
  });

  res.send(likedPosts.map(likes => likes.Post));
}));
```
- 게시물을 스크랩하고 취소하는 과정은 좋아요 기능과 비슷한 것 같아서 좋아요 기능을 스크랩 개념으로 합쳐서 사용자가 좋아요 한 게시글을 조회하는 방법으로 구현했다.
- `authenticateToken`으로 로그인 한 사용자인지 확인하고 사용자가 좋아요 한 게시글을 불러온다.

#### 게시물 검색 기능 구현
``` javascript
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
```
- 쿼리 파라미터로 검색어와 검색 범위를 받아서 게시물 검색 가능
- 검색어는 `query` 파라미터에, 검색 범위는 `option` 파라미터에

#### 💡3주차
- refresh 토큰도 구현하고 싶었으나 어려워서 하지 못했다. 대신 사용자 검증을 할 때마다 토큰을 재발급 해주는 방식으로 구현했다.
- Express.js는 라우트 정의 순서가 중요하다
    - 검색 기능을 구현해서 API를 보내서 확인할 때 `search?query=~~` 부분이 `GET /posts/:id` 의 id 부분으로 넘어가서 처리되는 문제 발생
    - 해결 방법 : 라우트 순서를 변경 => 검색 라우트를 게시글 조회 라우트보다 먼저 정의
    - Express.js는 위에서 아래로 라우트를 처리하기 때문에 구체적인 경로를 먼저 정의해야 한다.
