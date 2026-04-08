# 📅 WallCalendar – Interactive Calendar Component

A modern, interactive **wall-style calendar UI** built with Next.js.  
This project combines clean design with powerful features like date range selection, themed UI, and notes management.

---

 Live Demo : https://wall-calendar-lilac.vercel.app/

GitHub Repository : https://github.com/Shubhamkumar2703/WallCalendar

---

## ✨ Features

- 📅 Interactive calendar grid
- 🎯 Date range selection (start → end)
- 🎨 Dynamic month-based themes (colors, emoji, gradients)
- 📝 Notes system (month-wise & range-wise)
- 🎬 Smooth animations and transitions
- 📱 Fully responsive design
- 🎯 Holiday indicators with tooltips

---

## 🏗️ Project Structure
```
app/components/
├── WallCalendar.tsx
└── WallCalendar/
├── index.tsx
├── constants/
├── utils/
├── subcomponents/
└── hooks/
````

---

## 🧠 Architecture Overview

### 📌 Constants
- Month names, day names
- Theme configurations
- Holiday definitions

### ⚙️ Utils
- Date helper functions
- Styling & animation utilities

### 🧩 Subcomponents
- `HeroPanel` – Left panel (month, theme, navigation)
- `CalendarGrid` – Calendar UI with interactions
- `NotesSection` – Notes input & display

### 🔁 Hooks
- `useCalendarLogic` – Core logic:
  - Date navigation
  - Range selection
  - Notes management
  - Responsive handling

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **React (Hooks)**
- **TypeScript**
- **CSS (custom + inline styling)**

---

## 🚀 Getting Started

```bash
npm install
npm run dev

````

👨‍💻 Author

Shubham Kumar
