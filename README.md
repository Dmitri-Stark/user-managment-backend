# User Management API

TypeScript Node.js backend with MySQL for user and group management.

## Quick Start
```bash
npm install
docker-compose up --build
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users?limit=10&offset=0` | Get paginated users |
| GET | `/api/groups?limit=10&offset=0` | Get paginated groups |
| DELETE | `/api/groups/remove-user` | Remove user from group |
| PATCH | `/api/users/statuses` | Batch update user statuses |

## Example Requests

**Remove User from Group:**
```json
DELETE http://localhost:3000/api/groups/remove-user
{
  "userId": 1,
  "groupId": 1
}
```

**Update User Statuses:**
```json
PATCH http://localhost:3000/api/users/statuses
{
  "updates": [
    {"id": 1, "status": "active"},
    {"id": 2, "status": "blocked"}
  ]
}
```

## Database
- **API**: http://localhost:3000
- **phpMyAdmin**: http://localhost:8080 (user/password)
- **Test Data**: 100 users, 20 groups