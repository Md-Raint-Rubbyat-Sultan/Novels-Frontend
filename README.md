# 📚 Novels | A Platform for Book Worms

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/Shadcn%2FUI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6F00?style=for-the-badge&logo=recharts&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

> A modern platform where **users can read books** and **writers can post & share their works**.  
> To access premium content, readers and writers must subscribe (**Monthly | Yearly**).

🌐 **Live Demo:** [novels-client.vercel.app](https://novels-client.vercel.app)

---

## ✨ Features

✅ Role-based user management  
✅ Subscription-based access (**Monthly | Yearly**)  
✅ Role-based authentication: **User | Writer | Admin | Super_Admin**  
✅ Flexible dashboard for each role  
✅ Secure authentication with **Passport.js + JWT**  
✅ Email notifications with **Nodemailer + EJS Templates**

---

## 🛠 Tech Stack

- ⚛️ React.js
- 🔄 Redux
- 🎨 TailwindCSS
- 🖤 Shadcn/UI
- 📊 Recharts
- 🎥 Framer Motion

---

## 👥 User Roles

- 👑 **Super Admin** → Manage everything
- 🛠 **Admin** → Manage users, writers & books
- ✍️ **Writer** → Post & manage own books
- 📖 **User** → Read books after subscription

---

## 📦 Enums

### 📘 Book

```ts
export enum IBookTypes {
  NOVEL = "NOVEL",
  POEM = "POEM",
  SHORT_STORY = "SHORT_STORY",
  ACADECIM = "ACADECIM",
  OTHERS = "OTHERS",
}

export enum IBookLaguage {
  en = "en",
  bn = "bn",
  unknown = "unknown",
}

export enum IBookStatus {
  ONGOING = "ONGOING",
  COMPLETE = "COMPLETE",
}

export enum IBookStatusType {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}
```

### 💳 Payment

```ts
export enum Payment_Status {
  PAID = "PAID",
  UNPAID = "UNPAID",
  CANCLLED = "CANCLLED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum Subscription_Type {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}
```

### 👤 User

```ts
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  WRITER = "WRITER",
  USER = "USER",
}

export enum RoleStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
```

### ⚙️ Installation

```
# Clone the repository
git clone <your-repo-url>

# Navigate to the project folder
cd <project-folder>

# Install dependencies
npm install
```

### 🔐 Environment Variables

```
// Create a .env file in the project root:

VITE_BASE_URL=http://localhost:5000/api/v1
VITE_EMAIL_SERVIVE_ID=id-secrect
VITE_EMAIL_TAMPLATE_ID=template
VITE_EMAIL_PUBLIC_ID=public_id
```

### 🚀 Project Roadmap

- User Authentication

- Role-based Access Control

- Subscription System

- Payment Gateway Integration

- Book Recommendations Engine

- Mobile App Version

### 🤝 Contribution

Contributions are always welcome!
If you’d like to contribute, please fork the repo and submit a pull request.
