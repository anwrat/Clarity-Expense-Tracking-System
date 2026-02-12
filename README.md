# Clarity Expense Tracker 
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/a825146f-9ef8-445e-ba06-f9a0a92d25d7" />


A full-stack financial dashboard designed to provide users with clear, actionable insights into their spending habits. Built with a focus on clean UI, real-time data visualization, and secure data management.

**Live Demo:** [https://clarity-expense-tracking-system.vercel.app/](https://clarity-expense-tracking-system.vercel.app/)

---

##  Key Features

- **Dynamic Dashboard:** Real-time summary of Balance, Income, and Expenses.
- **Data Visualization:** Interactive Bar Charts for cash flow and Pie Charts for category breakdown using Recharts.
- **Smart Filtering:** Filter transactions by category and date ranges with instant UI updates.
- **Full CRUD:** Add, edit, and delete transactions with a sleek modal-based confirmation system.
- **Secure Auth:** JWT-based authentication to keep financial data private.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile views.

---

##  Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router DOM

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JSON Web Tokens (JWT) & Bcrypt

---

##  Installation & Setup

### Prerequisites
- Node.js
- A PostgreSQL database 

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
```
### 2. Navigate to backend directory
```bash 
cd backend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Create a .env file and add the following:
```bash
DATABASE_URL='neon db url with pooler'
DIRECT_URL='direct neon db link'
PORT=port for backend
CLIENT_URL='your client url'
SALT_ROUNDS=number of salt round
JWT_SECRET=secret jwt
```

### 5. Generate Prisma Client and sync database
```bash
npx prisma generate
```

### 6. Start the development server
```bash
npm run dev
```

### 7. Navigate to frontend directory
```bash
cd frontend
```

### 8.  Install dependencies
```bash
npm install
```

### 9.  Create a .env file and add the following:
```bash
VITE_BACKEND_API_URL="the backend url"
```

### 10. Start the development server
```bash
npm run dev
```
