export function formatINR(amount) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(amount))
  } catch {
    return `₹${Number(amount).toFixed(2)}`
  }
}
