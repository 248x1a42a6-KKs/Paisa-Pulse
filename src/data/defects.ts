import { DefectItem } from '../types';

export const DEFECT_ITEMS: DefectItem[] = [
  {
    id: 1,
    category: 'Form Validation',
    title: 'Empty, Negative, or Zero Input Submission',
    testScenarioKey: 'empty_input',
    description:
      'Submitting empty expense forms, non-numeric amounts, negative values, amounts > 10,000,000, notes under 3 letters, or blank monthly budgets caused crash or bad state.',
    stepsToReproduce:
      '1. Open "Add Expense" screen.\n2. Leave amount blank or enter 0 or -50.\n3. Leave category unselected.\n4. Type less than 3 characters in note.\n5. Click "Save Expense" or submit empty budget in budget dialog.',
    expectedBehavior:
      'The app should prevent submission, show precise real-time inline validation hints ("Enter a number", "Must be more than 0", "Choose a category", "Write at least 3 letters"), and highlight invalid fields.',
    actualFixedBehavior:
      'Fixed: Robust multi-rule validation checks all boundary criteria (> 0 and <= ₹1,00,00,000, trimmed note length 3–80, valid category, valid ISO date). The Save button is disabled while invalid or submitting.',
    fixed: true,
  },
  {
    id: 2,
    category: 'Layout & Typography',
    title: 'Very Long Text & Huge Numbers Overflowing Container',
    testScenarioKey: 'long_text',
    description:
      'Very long notes (e.g., 80 characters without spaces) or huge monetary values (e.g. ₹99,99,999.00) overflowed card boundaries, cutting off text or causing horizontal scrollbar distortion.',
    stepsToReproduce:
      '1. Create an expense with an 80-character uninterrupted string (e.g. "CollegeSemesterFeeForAdvancedArtificialIntelligenceAndMachineLearningEngineering...").\n2. View the Home page and Expense Detail page.',
    expectedBehavior:
      'Text must truncate gracefully with ellipsis (`...`) in list cards and wrap safely with `break-words` in detail views without breaking card borders or responsive layouts.',
    actualFixedBehavior:
      'Fixed: List cards enforce `truncate` and `overflow-hidden` with constrained width. Detail views and modals use `break-words` and `whitespace-pre-wrap` to guarantee zero layout overflow on any screen size.',
    fixed: true,
  },
  {
    id: 3,
    category: 'Offline Resilience & Storage',
    title: 'No Internet / Offline Data Loss Resilience',
    testScenarioKey: 'no_internet',
    description:
      'App failing to operate when the device is offline, or crashing if storage is empty, corrupted, or unavailable.',
    stepsToReproduce:
      '1. Disconnect device from internet or toggle offline mode.\n2. Add, edit, or delete expenses and adjust monthly budget.\n3. Reload the application while offline.',
    expectedBehavior:
      'App works 100% locally and offline via robust LocalStorage with JSON parsing error fallback, automatic state sync, and export/import backup support.',
    actualFixedBehavior:
      'Fixed: Complete offline-first storage engine with try-catch JSON parsing, automatic default initialization, quota guard, and full JSON backup/restore capabilities.',
    fixed: true,
  },
  {
    id: 4,
    category: 'State & Concurrency',
    title: 'Repeated Fast Taps & Double Submission',
    testScenarioKey: 'fast_taps',
    description:
      'Tapping "Save Expense" or "Delete" multiple times rapidly caused duplicate expense records or race conditions.',
    stepsToReproduce:
      '1. Open "Add Expense".\n2. Rapidly double-tap or triple-tap the "Save Expense" button.\n3. Check if duplicate items appear in the list.',
    expectedBehavior:
      'Only one expense should be added. The button must be debounced and disabled immediately upon the first click with a loading indicator.',
    actualFixedBehavior:
      'Fixed: Async submission flag with debounced event handlers prevents any duplicate execution. UI provides immediate visual feedback with loading state and confirmation toasts.',
    fixed: true,
  },
  {
    id: 5,
    category: 'Responsive Orientation',
    title: 'Phone Sideways / Landscape & Tablet View Distortion',
    testScenarioKey: 'phone_sideways',
    description:
      'Rotating phone sideways to landscape mode compressed vertical viewport, causing floating buttons to overlap cards and modals to clip vertically.',
    stepsToReproduce:
      '1. Open app on mobile device and rotate screen to landscape orientation (or switch to landscape preview mode).\n2. Open "Add Expense" or "Summary" modal.\n3. Observe scrolling and action button visibility.',
    expectedBehavior:
      'Layout must remain scrollable, with maximum modal heights (`max-h-[90vh]`), sticky actions, and option to view in realistic mobile phone container or fluid responsive view.',
    actualFixedBehavior:
      'Fixed: Implemented responsive viewport constraints, smooth scrolling modals with safe bottom margins, landscape-friendly grid layouts, and an interactive "Mobile Frame / Wide Fluid" toggle.',
    fixed: true,
  },
];
