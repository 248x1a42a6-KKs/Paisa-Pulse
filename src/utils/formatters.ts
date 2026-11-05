/**
 * Formats a number into Indian Rupee format (e.g. ₹1,250.00 or ₹12,50,000.00)
 */
export function formatINR(amount: number, showDecimals: boolean = true): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0.00';
  }

  const absAmount = Math.abs(amount);
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(absAmount);

  return `${amount < 0 ? '-' : ''}₹${formattedNumber}`;
}

/**
 * Formats date as DD/MM/YYYY matching the Flutter app's dateText getter (`${date.day}/${date.month}/${date.year}`)
 */
export function formatDateText(dateStringOrObj: string | Date): string {
  try {
    const d = typeof dateStringOrObj === 'string' ? new Date(dateStringOrObj) : dateStringOrObj;
    if (isNaN(d.getTime())) return 'Invalid date';
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return 'Invalid date';
  }
}

/**
 * Formats date to YYYY-MM-DD for standard HTML input[type=date]
 */
export function toInputDateFormat(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a date falls in the same calendar month and year as now
 */
export function isSameMonth(dateString: string, targetDate: Date = new Date()): boolean {
  try {
    const d = new Date(dateString);
    return d.getMonth() === targetDate.getMonth() && d.getFullYear() === targetDate.getFullYear();
  } catch {
    return false;
  }
}
