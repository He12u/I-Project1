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

_Response (200 - OK)_

```json
{
  "count": 1,
  "rows": [
    {
      "id": 1,
      "name": "Nasi Goreng",
      "description": "Nasi dengan bahan berkualitas tinggi",
      "price": 12000,
      "imgUrl": "https://www.shutterstock.com/image-photo/nasi-goreng-indonesian-chicken-fried-rice-2262586337",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2023-11-29T06:26:13.790Z",
      "updatedAt": "2023-11-29T06:26:13.790Z"
    }
  ]
}
```

## 2. GET /pub/cuisines/:id

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Nasi Goreng",
  "description": "Nasi dengan bahan berkualitas tinggi",
  "price": 12000,
  "imgUrl": "https://www.shutterstock.com/image-photo/nasi-goreng-indonesian-chicken-fried-rice-2262586337",
  "categoryId": 1,
  "authorId": 1,
  "createdAt": "2023-11-29T06:26:13.790Z",
  "updatedAt": "2023-11-29T06:26:13.790Z"
}
```

## 3. POST /users/add-user

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body :

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 6,
  "email": "emailsekian@example.com"
}
```

## 4. POST /users/login

- body :

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxNTExNzA1fQ.Mr7i52cmHEB3093czoabqusU0M8bSXiaV9940Qr6-gQ",
  "username": "Alice",
  "role": "admin"
}
```

## 5. GET /categories

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

{
"data": [
{
"id": 1,
"name": "Food",
"createdAt": "2023-11-29T06:26:13.778Z",
"updatedAt": "2023-11-29T06:26:13.778Z"
},
{
"id": 2,
"name": "Drink",
"createdAt": "2023-11-29T06:26:13.778Z",
"updatedAt": "2023-11-29T06:26:13.778Z"
},
{
"id": 3,
"name": "Snack",
"createdAt": "2023-11-29T06:26:13.778Z",
"updatedAt": "2023-11-29T06:26:13.778Z"
}
]
}

## 6. POST /categories/add

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body :

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "newCategory": {
    "id": 4,
    "name": "string",
    "updatedAt": "2023-12-02T10:13:22.172Z",
    "createdAt": "2023-12-02T10:13:22.172Z"
  }
}
```

## 7. PUT /categories/:id/update

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
  "name": "string"
}
```

_Response (201 - OK)_

```json
{
  "id": 2,
  "name": "Junky",
  "createdAt": "2023-11-29T06:26:13.778Z",
  "updatedAt": "2023-12-02T10:17:11.376Z"
}
```

## 8. DELETE /categories/:id/delete

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
  "message": "Category with id 3 success to delete"
}
```

## 9. GET /cuisines

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "count": 18,
  "rows": [
    {
      "id": 1,
      "name": "Nasi Goreng",
      "description": "Nasi dengan bahan berkualitas tinggi",
      "price": 12000,
      "imgUrl": "https://www.shutterstock.com/image-photo/nasi-goreng-indonesian-chicken-fried-rice-2262586337",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2023-11-29T06:26:13.790Z",
      "updatedAt": "2023-11-29T06:26:13.790Z",
      "User": {
        "id": 1,
        "username": "Alice",
        "email": "alice@example.com",
        "role": "admin",
        "phoneNumber": "123-456-7890",
        "address": "123 Main St",
        "createdAt": "2023-11-29T06:26:13.749Z",
        "updatedAt": "2023-11-29T06:26:13.749Z"
      }
    }
  ]
}
```

## 10. POST /cuisines/add

- headers :

```json
{
  "Authorization": "Bearer <access_token>"
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

\_Response (201 - Created)

```json
{
  "id": 24,
  "name": "new cuisines",
  "description": "new cuisines description",
  "price": 10000,
  "imgUrl": "link",
  "categoryId": 1,
  "authorId": 1,
  "updatedAt": "2023-12-02T10:29:01.361Z",
  "createdAt": "2023-12-02T10:29:01.361Z"
}
```

## 11. GET /cuisines/:id

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
  "id": 9,
  "name": "Vegetable Stir Fry",
  "description": "Assorted vegetables stir-fried in a flavorful sauce.",
  "price": 10000,
  "imgUrl": "https://example.com/vegetable_stir_fry.jpg",
  "categoryId": 1,
  "authorId": 2,
  "createdAt": "2023-11-29T06:26:13.790Z",
  "updatedAt": "2023-11-29T06:26:13.790Z"
}
```

## 12. PUT /cuisines/:id/update

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
{
  "id": 3,
  "name": "Tahu Tek",
  "description": "Tahu tek bahan berkualitas",
  "price": 10000,
  "imgUrl": "https://www.shutterstock.com/image-photo/tahu-tek-typical-food-surabaya-east-1624272445",
  "categoryId": 1,
  "authorId": 1,
  "createdAt": "2023-11-29T06:26:13.790Z",
  "updatedAt": "2023-12-02T10:32:59.167Z"
}
```

## 13. PATCH /cuisines/:id/updateImgUrl

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
  image: "file";
}
```

_Response (200 - OK)_

```json
{
  "message": "Image success to update"
}
```

## 14. DELETE /cuisines/:id/delete

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
  "message": "Cuisine with id 2 success to delete"
}
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
