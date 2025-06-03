/**
 * Formata uma data no padrão brasileiro (dd/mm/aaaa ou dd/mm/aaaa HH:mm).
 *
 * @param date A data a ser formatada.
 * @param hour Opcional. Use `true` para incluir hora e minuto no formato (HH:mm).
 * @returns A data formatada como string.
 */
export function formatDateBr(date?: Date, showTime?: boolean): string {
  if (!date) return ''
  let optionsDateFormat: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }

  if (showTime) {
    optionsDateFormat = {
      ...optionsDateFormat,
      hour: '2-digit',
      minute: '2-digit',
    }
  }
  return date.toLocaleString('pt-BR', optionsDateFormat)
}
