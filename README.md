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

***

### 2주차 : 게시판 DB 연결하고 로그인/로그아웃/회원가입 기능 추가하기

#### ERD
- 데이터베이스 관계 모델

  <img src="/erd.png" width="600px">

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
    Set-Cookie: connect.sid=s%3A-sEryGLSwDkuFpkZTJQlrzILXzVfbkkE.VxbV3wby9rnQOLjBTHvks0qh6GLPCEucQ8X4SY7hpUk; Path=/; HttpOnly
    Date: Thu, 18 Jul 2024 00:41:48 GMT
    Connection: close
    
    {
      "message": "회원가입 완료!"
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
- DB에서 불러온 데이터를 다루는 과정에서 비동기 함수와 Promise에 대해 확실히 알게 된 것 같다.
