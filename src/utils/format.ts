
export function formatHora(hora: string): string {
  const [h = '', m = '00'] = (hora || '').split(':')

  const hour = parseInt(h, 10)

  if (isNaN(hour)) return hora || '--:--'

  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  
  return `${hour12}:${m} ${ampm}`
}

export function getInitials(nombre: string): string {
  return nombre
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Recibe el string directamente, no el objeto 'user' completo
export function getUserInitials(name: string | null | undefined): string {
  // 1. Si no hay nombre, devolvemos el valor por defecto
  if (!name || !name.trim()) return 'DR';
  
  const names = name.trim().split(/\s+/);

  // 2. Lógica para dos o más palabras
  if (names.length >= 2) {
    const firstInitial = names[0]?.charAt(0) || '';
    const secondInitial = names[1]?.charAt(0) || '';
    return (firstInitial + secondInitial).toUpperCase();
  }

  // 3. Lógica para una sola palabra
  return names[0]?.substring(0, 2).toUpperCase() || 'DR';
}

export function formatFecha(fecha: Date): string {
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}


export function formatFechaCompleta(fecha: Date): string {
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return fecha.toLocaleDateString('es-ES', opciones)
}

/**
 * Check if two dates are the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns True if today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

/**
 * Calculate IMC (Body Mass Index)
 * @param peso - Weight in kg
 * @param talla - Height in cm
 * @returns IMC value or null if invalid inputs
 */
export function calcularIMC(peso: number, talla: number): number | null {
  if (peso <= 0 || talla <= 0) return null
  const tallaMetros = talla / 100
  return peso / (tallaMetros * tallaMetros)
}

/**
 * Get IMC classification in Spanish
 * @param imc - IMC value
 * @returns Classification string
 */
export function getIMCClasificacion(imc: number): string {
  if (imc < 18.5) return 'Bajo peso'
  if (imc < 25) return 'Normal'
  if (imc < 30) return 'Sobrepeso'
  return 'Obesidad'
}

/**
 * Validate email format
 * @param email - Email string
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Delay utility for simulating async operations
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
