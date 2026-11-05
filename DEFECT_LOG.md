# Defect Log - Paisa Pulse v2

| # | Defect Category | Description | Steps to Reproduce | Fixed? |
|---|---|---|---|---|
| 1 | **Form Validation** - Empty, Negative, or Zero Input Submission | Submitting empty expense forms, non-numeric amounts, negative values, amounts > 10,000,000, notes under 3 letters, or blank monthly budgets caused crash or bad state. | 1. Open "Add Expense" screen.<br>2. Leave amount blank or enter 0 or -50.<br>3. Leave category unselected.<br>4. Type less than 3 characters in note.<br>5. Click "Save Expense" or submit empty budget in budget dialog. | Yes (Fixed & Verified) |
| 2 | **Layout & Typography** - Long Text & Huge Numbers Overflowing Container | Very long notes (e.g., 80 characters without spaces) or huge monetary values (e.g. ₹99,99,999.00) overflowed card boundaries, cutting off text or causing horizontal scrollbar distortion. | 1. Create an expense with an 80-character uninterrupted string.<br>2. View the Home page and Expense Detail page. | Yes (Fixed & Verified) |
| 3 | **Offline Resilience & Storage** - No Internet / Data Loss Resilience | App failing to operate when the device is offline, or crashing if storage is empty, corrupted, or unavailable. | 1. Disconnect device from internet or toggle offline mode.<br>2. Add, edit, or delete expenses and adjust monthly budget.<br>3. Reload the application while offline. | Yes (Fixed & Verified) |
| 4 | **State & Concurrency** - Repeated Fast Taps & Double Submission | Tapping "Save Expense" or "Delete" multiple times rapidly caused duplicate expense records or race conditions. | 1. Open "Add Expense".<br>2. Rapidly double-tap or triple-tap the "Save Expense" button.<br>3. Check if duplicate items appear in the list. | Yes (Fixed & Verified) |
| 5 | **Responsive Orientation** - Phone Sideways / Landscape & Tablet View Distortion | Rotating phone sideways to landscape mode compressed vertical viewport, causing floating buttons to overlap cards and modals to clip vertically. | 1. Open app on mobile device and rotate screen to landscape orientation.<br>2. Open "Add Expense" or "Summary" modal.<br>3. Observe scrolling and action button visibility. | Yes (Fixed & Verified) |

### Test Suite Verification
- [x] **Empty Input**: Rejects blank amounts, 0, negative values, unselected categories, notes < 3 chars, and values > ₹1,00,00,000.
- [x] **Very Long Text**: 80-char notes and large ₹ amounts wrap cleanly without container overflow (`truncate` and `break-words`).
- [x] **No Internet**: Works 100% offline with robust LocalStorage persistence, backup export, and import.
- [x] **Repeated Fast Taps**: Button debounce and async submission flag prevent duplicate transactions.
- [x] **Phone Sideways**: Responsive viewport adaptation with mobile frame toggle for landscape phones and wide screens.
