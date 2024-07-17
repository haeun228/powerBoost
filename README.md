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

#### 💡 1주차
- `app.use(express.json())` 사용하는 것을 잊지 말 것!
    - (`express.json()` : JSON 형식의 HTTP 요청 body를 자동을 parsing 해주는 미들웨어)
- JSON은 자바스크립트 객체와 다르게 마지막 요소 뒤에 쉼표(`,`)가 있으면 에러가 난다
