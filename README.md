# Blog App
This is an api for a Blog app

---

## Requirements
1. Users should have a first_name, last_name, email, password
2. A user should be able to sign up and sign in into the blog app
3. Implement JWT authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs. 
    a. The endpoint should be paginated
    b. It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
    a. default it to 20 blogs per page. 
    b. It should also be searchable by author, title and tags.
    c. It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
16. Test Application


---
## Setup
- Install NodeJS, mongodb
- pull this repo
- run npm intall
- run `npm run start:dev`

---
## Base URL
- https://dead-teal-ray-wig.cyclic.app/


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  username |  string |  required, unique |
|  firstname | string  |  required |
|  lastname  |  string |  required  |
|  email     | string  |  required, unique |
|  password |   string |  required  |


### Order
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  title |  string |  required, unique |
|  description | string  |  required|
|  author  |  string |  required |
|  state  |  string |  required, enum: ["draft", "published", default: "draft"]  |
|  read_count |   number |  required, default: 0  |
|  reading_time |  string |  required |
|  tags |  string |  required |
|  body|  string |  required |



## APIs
---

### Signup User

- Route: /api/v1/blog/signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
        "username": 'jon_doe",
    }
}
```
---
### Login User

- Route: /api/v1/blog/login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "username": 'jon_doe",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```

...
### Create Blog

- Route: /api/v1/blog
- Method: POST
- Header
    - Authorization: Query {token}
- Body: 
```
{
    "title": "Think like a Negro",
    "description": "test desc",
    "author": "Steve Harv",
    "tags": "things u want",
    "body": "are u sure",
}
```

- Responses

Success
```
{
    "id": "6361913b51d0732d7b9e9e60",
    "title": "Think like a Negro",
    "description": "test desc",
    "author": "Steve Harv",
    "state": "draft",
    "read_count": 2,
    "reading_time": "7min",
    "tags": "things u want",
    "body": "are u sure",
    "createdAt": "2022-11-01T20:58:10.981+00:00",
    "updatedAt": "2022-11-01T20:58:10.981+00:00"
}
```
---
### Get blog

- Route: /api/v1/blog/:id
- Method: GET

Success
```
{
    "id": "6361913b51d0732d7b9e9e60",
    "title": "Think like a Negro",
    "description": "test desc",
    "author": "Steve Harv",
    "state": "draft",
    "read_count": 3,
    "reading_time": "7min",
    "tags": "things u want",
    "body": "are u sure",
    "createdAt": "2022-11-01T20:58:10.981+00:00",
    "updatedAt": "2022-11-01T20:58:10.981+00:00"
}
```
---
## Contributor
- Marshal Olu
