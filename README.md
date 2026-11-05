# Paisa Pulse 💰

**Topic:** Expense Tracker (Flutter Application Development Programme Group Project)  
**Delivered by:** IITM Pravartak and BodhBridge Flutter Lab  
**College:** KHIT Guntur  

A simple, student-friendly expense tracker built for our Application Development Programme group project. It helps college students and daily spenders keep track of everyday expenses in Indian Rupees (₹), set a monthly budget, and avoid overspending with timely warnings.

---

## 📸 Screenshots

Add your three app screenshots into the `docs/` folder:
- **Home & Budget Status:** `docs/screenshot_home.png`
- **Add Expense & Form Validation:** `docs/screenshot_form.png`
- **Category Summary Breakdown:** `docs/screenshot_summary.png`

---

## 👥 Project Team

| Member | Roll / ID | Responsibilities & Parts Built |
|---|---|---|
| **K. Lokesh** | Team Lead / Developer | Home dashboard, Budget progress & warning logic (80% warning + over-budget alert), Category summary breakdown, and offline storage handling. |
| **K. Kiran** | Developer / QA | Add Expense form & input validations, Expense Detail screen with delete confirmation, defect testing (all 5 edge cases), and responsive styling. |

---

## 💡 Why We Built This

As college students, we often find ourselves wondering where all our pocket money went by the middle of the month. Most finance apps out there are either too complicated, filled with ads, or ask for unnecessary bank permissions and logins. 

We wanted something straightforward:
- Open the app and immediately see how much you spent this month.
- Set a budget and get a clear nudge when you have spent 80% or if you have exceeded it.
- Log an expense in under five seconds with proper category tags (Canteen food, bus fare, books, recharges, etc.).
- Keep all data 100% private and stored locally on the device—no internet needed and no sign-ups.

---

## 📱 App Walkthrough & Screens

1. **Home Screen**:
   - Shows total spending for the current month right at the top.
   - An interactive **Budget Card** that changes color based on spending habits:
     - 🟢 **Normal**: Shows remaining budget amount.
     - 🟠 **Careful (80%+)**: Warns you that 80% or more of your limit is used up.
     - 🔴 **Over Budget**: Highlights the exact amount exceeded.
   - A reverse chronological list of recent transactions with category icons, notes, dates, and amounts.
   - Search bar to quickly locate past expenses.
   - Clean states for loading, empty list, and an error screen with a "Retry" button.

2. **Add & Edit Expense**:
   - Quick form to add an expense with real-time validation:
     - Amount must be a positive number up to ₹1,00,00,000.
     - Select from 7 everyday categories: *Food, Travel, Study, Bills, Fun, Health, Other*.
     - Note (between 3 and 80 characters).
     - Date picker (defaults to today).
   - Built-in debounce to prevent duplicate entries if the save button is tapped repeatedly.

3. **Expense Details Screen**:
   - Detailed view showing note, date, category tag, and the percentage share of overall monthly spending.
   - Option to edit details or delete with a *"Delete expense? This cannot be undone"* safety confirmation.

4. **Summary & Insights**:
   - Category-wise breakdown with progress bars showing where the money went.
   - Quick toggle to switch between **This Month** and **All Time** stats.

5. **Defect Log & QA Testing**:
   - Dedicated testing suite directly accessible in the app verifying the 5 mandatory edge cases:
     1. Empty and invalid inputs
     2. Long uninterrupted text (80 chars) and large numbers
     3. 100% offline data persistence (LocalStorage)
     4. Rapid double-tap submission prevention
     5. Phone sideways / landscape responsive layout

---

## 💾 Data Storage

All data is stored directly on your device using local storage (`localStorage`). No external servers, no tracking, and no internet required. Users can also export a JSON backup file or restore previously saved data anytime from the menu.

---

## 🛠️ Tech Stack

- **Framework:** React 19 with TypeScript (Vite)
- **Styling:** Tailwind CSS (Teal Material theme)
- **Icons:** Lucide Icons
- **Storage:** LocalStorage with JSON error fallback & backup export

---

## 🚀 Running the Project

### Web Version (Vite / React)
```bash
npm install
npm run dev
# Open http://localhost:3000
npm run build # Generates dist/
```

### Android / Flutter Release Build
```bash
flutter pub get
flutter test
flutter run
flutter build apk --release
# Release APK is output at: build/app/outputs/flutter-apk/app-release.apk
```
