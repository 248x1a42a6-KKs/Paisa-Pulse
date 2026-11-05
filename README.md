# Paisa Pulse - Expense & Budget Tracker

**Topic:** Expense & Budget Tracker (Group Project)
Track daily spending in Indian Rupees (₹), set a monthly budget, and receive proactive warnings when you reach 80% or exceed your budget.

## Core Features & Screens
1. **Home Screen**:
   - Monthly spending card formatted in Indian Rupee notation (`₹`).
   - Interactive Budget Card with dynamic alert thresholds:
     - Normal: shows remaining budget.
     - 80% Warning: amber alert ("Careful! X% of budget used").
     - Over Budget: red error alert ("Over budget by ₹X").
     - Empty budget: "Set monthly budget" setup prompt.
   - Recent Expenses list sorted newest first with category avatars and formatted dates.
   - Search & filter by note, category, or amount.
   - Empty state, loading state, and error state with "Retry" action.
2. **Detail Screen**:
   - Detailed breakdown of individual expenses.
   - Share of all spending calculation (percentage and progress indicator).
   - Edit expense and Delete expense with confirmation modal.
3. **Add / Edit Expense**:
   - Validated form with real-time feedback.
   - Validations: Amount (> 0 and <= ₹1,00,00,000), Category picker (Food, Travel, Study, Bills, Fun, Health, Other), Note (3–80 characters), and Date picker.
   - Debounce protection against rapid double-taps.
4. **Summary Screen**:
   - Total expenditure breakdown by category.
   - Visual progress bars for category share.
   - Switchable between "This Month" and "All Time" spending.
5. **Defect Log & QA Suite (5/5 Fixed)**:
   - Form empty/boundary validation.
   - Very long text & number containment.
   - 100% offline LocalStorage persistence with JSON backup export/import.
   - Fast tap debounce protection.
   - Phone sideways / landscape responsive view.

## Technology Stack
- React 19 + TypeScript
- Tailwind CSS v4
- Lucide Icons
- Offline LocalStorage
