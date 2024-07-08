# powerBoost Study
## 이화여대 파워부스트 스터디

### 게시판 API

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
