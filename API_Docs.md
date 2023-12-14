[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13040511&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

## List of Available Endpoints :

- 'POST /auth/register'
- 'POST /auth/login'

- 'POST /googleLogin'

routes below need authentication :

- 'POST /payment/midtrans/token'

- 'PUT /users/:id
- 'DELETE /users/:id
- 'GET /users/:id
- 'PUT /users/:id/follow
- 'PUT /users/:id/unfollow
- 'GET /users/friends/:userId

&nbsp;

## 1. POST /auth/register

_Query_

```js
const { username, email, password } = req.body;
```

- body :

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "profilePicture": "",
  "coverPicture": "",
  "followers": [],
  "following": [],
  "isAdmin": false,
  "isMember": false,
  "id": 7,
  "username": "user4",
  "email": "user4@example.com",
  "password": "$2a$05$ybkM5cOgAWrD0C2Jpucu2eSjo8pRNoX/jefF6POktyMyWDTWEVKTW",
  "updatedAt": "2023-12-14T22:55:21.402Z",
  "createdAt": "2023-12-14T22:55:21.402Z",
  "desc": null,
  "city": null,
  "from": null
}
```

## 2. POST /auth/login

_Response (200 - OK)_

- body :

```json
{
  "email": "string",
  "password": "string"
}
```

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzAyNTk0NTY2fQ.lvhnK6nGHXJ-V8P99Rf85XlJ-XnxyioWmMPdCo6RReY",
  "username": "user1"
}
```

## 3. POST /googleLogin

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxNTExNzA1fQ.Mr7i52cmHEB3093czoabqusU0M8bSXiaV9940Qr6-gQ",
  "username": "Alice",
  "role": "admin"
}
```

## 4. PUT /users/:id

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```js
{
  id: "integer";
}
```

- body :

```json
{
  "desc": "string",
  "city": "string",
  "from": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
  "username": "user1",
  "email": "user1@example.com",
  "password": "$2a$05$Et2vCCLw3m5gur3kap.j.OAUDZxC2JYF2.sA9pqSvvcrBFgpk7hYO",
  "profilePicture": "",
  "coverPicture": "",
  "followers": [],
  "following": [],
  "isAdmin": false,
  "desc": "new desc",
  "city": "city",
  "from": "from",
  "isMember": true,
  "createdAt": "2023-12-13T14:23:27.215Z",
  "updatedAt": "2023-12-14T23:06:12.607Z"
}
```

## 5. DELETE /users/:id

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```js
{
  id: "integer";
}
```

_Response (200 - OK)_

```json
{
  "message": "Account has been deleted"
}
```

## 6. GET /users/:id

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```js
{
  id: "integer";
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "profilePicture": "",
  "coverPicture": "",
  "followers": [],
  "following": [3],
  "isAdmin": true,
  "desc": null,
  "city": null,
  "from": null,
  "isMember": true,
  "createdAt": "2023-12-13T14:23:27.210Z",
  "updatedAt": "2023-12-13T15:45:29.339Z"
}
```

## 7. PUT /users/:id/follow

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```js
{
  id: "integer";
}
```

\_Response (200 - OK)

```json
{
  "message": "user has been followed"
}
```

## 8. PUT /users/:id/follow

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```js
{
  id: "integer";
}
```

\_Response (200 - OK)

```json
{
  "message": "user has been unfollowed"
}
```

## 9. GET /users/friends/:userId

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params

```js
{
  id: "integer";
}
```

- body :

```js
{
    name: "string",
    description: "string",
    price: "integer",
    imgUrl: "string",
    categoryId: "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 3,
    "username": "string",
    "profilePicture": "string"
  }
]
```

&nbsp;

## Global Error :

_Response (400 - Validation Error)_

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized access"
}
```

_Response (403 - Forbiden)_

```json
{
  "message": "Forbiden Access"
}
```

_Response (404 - NotFound)_

```json
{
  "message": "Error not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
