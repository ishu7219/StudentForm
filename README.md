# 🎓 Student Enrollment Form

A responsive and stylish **student enrollment form** built with **HTML, Bootstrap 5, and JavaScript**.  
The form allows users to **save**, **update**, and **reset** student records using **JSONPowerDB** as the backend.

---

## 📌 Features

- ✅ Modern glassmorphism UI using Bootstrap
- ✅ Save student data (Roll No, Name, Class, DOB, Address, Enrollment Date)
- ✅ Update existing records using Roll No
- ✅ Reset form to default state
- ✅ Data storage powered by [JSONPowerDB](https://login2explore.com/jpdb.html)
- ✅ Auto-fills data if Roll No already exists

---

## 📁 Tech Stack

- **Frontend**: HTML5, CSS3, Bootstrap 5
- **Logic**: JavaScript (jQuery, AJAX)
- **Database**: JSONPowerDB (NoSQL, REST API)

---

## 🖼️ Screenshots

### 🎯 Student Enrollment Form (UI)
![Form Screenshot](./Screenshot%20(316).png)

### 🗃️ JSONPowerDB Data
![JPDB Data Screenshot](./Screenshot%20(315).png)

---


## 📂 Project Structure

```
├── index.html # Frontend Form UI
├── index.js # JavaScript logic for Save, Update, and Resetc
├── README.md # This file
├── assets/ # Optional: images or styles

```

---

## ⚙️ How It Works

1. User enters a **Roll No**
2. If Roll No exists → auto-fills form and enables **Update**
3. If not found → enables fields and allows **Save**
4. Uses AJAX to POST data to JSONPowerDB via:
   - `/api/iml/put` for new record
   - `/api/iml/set` to update
   - `/api/irl` for read/fetch

---





## 📧 Author

**👤 Ishwari Patil **  
BE Computer Engineering | Passionate Web Developer  
📧 Contact: [ishwari680@example.com] 

---

## ⭐️ Show your support

If you like this project, give it a ⭐ on [GitHub](https://github.com/ishu7219/studentform)!

