# QCash-Client

Front-end client for QCash — a fintech demo supporting user registration, wallet management, and an admin panel. Built with React, TypeScript, Shadcn, Vite and Redux Toolkit (RTK Query).


## Project overview
This repository contains the client application for QCash. Key features:
- User/Agent registration and login 
- Profile completion with image upload using cloudinary
- Wallet and transaction
- Admin endpoints for user/wallet/transaction management and analytics
- State management using Redux Toolkit + RTK Query
- API client based on Axios with a reusable RTK Query base query


## Technology stack

- React 18 + TypeScript
- Vite
- Redux Toolkit + RTK Query + Axios
- Tailwind CSS and shadcn UI components



## Notes:
```
A new user must update their profile information before starting transactions — especially their **bank account number**. Unless they cannot start the transaction between users.
```


## Useful commands

- Install dependencies: `npm install` or `bun install`
- Start dev server: `npm run dev` or `bun dev`
- Build: `npm run build`
- Preview production build: `npm run preview`


## Live URL

```
Live: https://qcashh.netlify.app/
Backend Repo: https://github.com/MasumAhmed19/QCash-Backend
Frontend Repo: https://github.com/MasumAhmed19/QCash-Client
```

