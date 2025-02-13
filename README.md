

# **Directory Management System**  

A **React.js** and **.NET Core Web API**-based **Business Directory Management System** that allows users to manage business listings with features like **CRUD operations, search, pagination, and sorting**.

## **Tech Stack**
### **Frontend:**  
🔹 React.js (Vite)  
🔹 Axios for API calls  
🔹 Bootstrap & React-Bootstrap for UI  
🔹 React Router for navigation  

### **Backend:**  
🔹 .NET Core Web API  
🔹 Entity Framework Core (EF Core)  
🔹 SQL Server for database  
🔹 Swagger for API documentation  


## **Project Structure**
```markdown
/DirectoryManagement
├── /backend (ASP.NET Core Web API)
│   ├── Controllers
│   ├── Data
│   ├── Models
│   ├── Services
│   ├── appsettings.json
│   ├── Program.cs
│
├── /frontend (React.js)
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   │   ├── Home.js
│   │   │   ├── BusinessList.js
│   │   │   ├── EditBusiness.js
│   │   │   ├── AddBusiness.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│
└── README.md
```

## **Setup & Installation**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/directory-management.git
cd directory-management
```

### **2️⃣ Setup Backend (.NET Core Web API)**
#### **Prerequisites:**  
- .NET 6+ SDK  
- SQL Server  
- SSMS (SQL Server Management Studio)  

#### **Steps:**  
```bash
cd backend
dotnet restore
dotnet ef database update  # Run migrations
dotnet run
```
🔹 **API will run on** `http://localhost:5159/api/Business`  

---

### **3️⃣ Setup Frontend (React.js)**
#### **Prerequisites:**  
- Node.js & npm  

#### **Steps:**  
```bash
cd frontend
npm install
npm start
```
🔹 **App will run on** `http://localhost:3000`

---

🔗 **GitHub Repo:** https://github.com/NainikaJain/Directory-Management-System

