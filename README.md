# SkillSwap

SkillSwap is a full-stack skill exchange platform where users can learn skills from other people by teaching skills in return.

Instead of paying for a course or mentor, users can connect with people who teach what they want to learn and exchange skills with each other.

## Features

- User signup and login
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Browse available skills
- Search for skills
- View teachers for a selected skill
- View teacher profiles
- Send skill swap requests
- Accept or reject swap requests
- Prevent duplicate active swap requests
- View active skill swaps
- Manage teaching and learning skills
- Edit profile information
- Change account password
- Light and dark mode
- Responsive user interface

## Tech Stack

### Frontend
- React
- React Router
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- bcrypt

## How It Works

1. Create a SkillSwap account.
2. Add the skills you can teach and the skills you want to learn.
3. Explore the available skills.
4. Select a skill and view people who teach it.
5. View a teacher's profile and see what they want to learn.
6. Send a skill swap request.
7. The teacher can accept or reject the request.
8. Accepted requests appear in your active swaps.

## Project Structure

```text
SkillSwap/
│
├── Backend/
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   ├── app.js
│   └── package.json
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md
