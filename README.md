# PhotoLib

A Next.js Pinterest-style photo & GIF board with masonry layout, role-based access, and secure login.

## Security model

- Public users can browse feed without login.
- Authenticated users can upload (`/api/upload`).
- Admin-only area at `/admin` and `/api/admin/*`.
- Credentials login validates account status and password hash.
- Input validation with Zod + MIME/size checks for uploads.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Demo users:

- `admin@photolib.dev` / `Admin@12345`
- `user@photolib.dev` / `User@12345`
