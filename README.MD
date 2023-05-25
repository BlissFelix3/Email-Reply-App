# CODE CHALLENGE

Email Reply Application

---

## Stack

<div align="center">

<a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="">![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)</a>
<a href="">![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)</a>
<a href="">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
<a href="">![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)</a>

</div>

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)
- Angular CLI: Install it by running `npm install -g @angular/cli`.
- PostgreSQL: Follow this guide to install and setup PostgreSQL: [PostgreSQL Tutorial](https://www.postgresqltutorial.com/install-postgresql/)
- Docker: Follow this guide to install Docker:[Docker Installation Guide](https://docs.docker.com/get-docker/)

### Installing and Running the Application

#### Main

1. Clone this repository
    `git clone https://github.com/the-repo-url.git`

2. Navigate into project directory:
    `cd repo-name`

#### LocalStack and AWS SES Setup
1. Rename `.docker.env` and `.example.env` provided to `.env`and input your your set values

2. Run LocalStack using docker-compose. A docker-compose.yml file is provided in the repository.
 
3. Run `docker-compose up --build` to connect to the database using docker and build the localstack to mock the AWS SES Service.

4. Make sure to run your installed docker to run the docker engine in the background.

5. Run the `https://localhost:3000/email/test` to test that the SES(via LocalStack) is running 

#### Backend

1. Run `npm install` to install all required dependencies.
2. Make sure PostgreSQL is running.
3. Update the `.env` file with your PostgreSQL credentials.
4. Run `npm run start:dev` to start the local development server.

#### Frontend

1. Run `npm install` to install all required dependencies.
2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Backend Basic Features

## User

| field    | data_type | constraints      |
| -------- | --------- | ---------------- |
| email    | string    | required, unique |
| username | string    | required, unique |
| password | string    | required         |

---

### Signup User

- Route: auth/signup
- Method: POST
- Body:

```
{
    "username": "John Does",
    "email": "john@gmail.com",
    "password": "password23",

}

```

- Responses

Success

```javascript
{
    "user": "bliss",
    "message": "Signup Successful"
}
```

- Response statusCodes

```javascript
  - 201: success || Created
  - 409: error || Conflict Error
  - 400: error || Bad Request
  - 500: error || Internal Server Error
```

---

### Login User

- Route: auth/login
- Method: POST
- Body:

```
{
    "email": "janetdoe@gmail.com",
    "password": "password"
}
```

- Responses

Success

```
{     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZmIyZmYwOS1mYTlkLTQ2MjEtOTFlMS0wZDZlYzVkMDg5Y2YiLCJmdWxsTmFtZSI6IkphbmV0IERvZSIsImVtYWlsIjoiamFuZXRkb2VAZ21haWwuY29tIiwiaWF0IjoxNjgyNDExNTA5LCJleHAiOjE2ODI0MTMzMDl9.N36xJBna2geYixgjj7HRJelCiaqco9akdjn0sYsBOtE"

}
```

---

### Email

| field     | data_type | constraints |
| --------- | --------- | ----------- |
| to        | string    | required,   |
| from      | string    | required,   |
| subject   | string    | required,   |
| body      | string    | required    |
| userId    | string    | optional    |
| createdAt | Date      |             |
| updatedAt | Date      |             |

### Email Routes

- Route: `/emails/create`
- Method: POST
- Header
  -authorization : Bearer {token}
- Body:

```
{

    "to": "recipient@example.com",
    "from": "sender@example.com",
    "subject": "Hello",
    "body": "This is a test email"

}

```

- Responses

Success

```
{
    "subject": "Hello",
    "body": "This is a test email",
    "user": {
        "id": `${userId}`,
        "username": "John",
        "email": "john@gmail.com"
    },
    "id": `${emailId}`,
    "createdAt": "2023-05-23 20:32:00.125668+01"
}

```

- Route: `/emails`
- Method: GET
- Header
  -authorization : Bearer {token}
- Responses

Success

```
{
  [`{Lists of emails}`]
}

```

- Route: `/emails/:id`
- Method: GET
- Header
  -authorization : Bearer {token}
- Responses

Success

```
{
  [`{email id}`]
}

```

- Route: `/emails/:id/reply`
- Method: POST
- Header
  -authorization : Bearer {token}
- Body:

```
{
  "reply": "This is a test reply"
}

```

- Responses

Success

```
{
  "message": "Reply sent"
}

```

### Basic FrontEnd Features

1. The Home page displays a list of emails.
2. Click on an email to view its details and replies.
3. Click on 'Create Email' to compose a new email.
4. You can reply to an email from its details page.

## License

This project is licensed under the MIT License.
