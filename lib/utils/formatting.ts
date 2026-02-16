/**
 * Utility functions for formatting and calculations
 */

export function formatNumber(num: number, decimals: number = 2): string {
  return Number(num.toFixed(decimals)).toLocaleString('en-US');
}

export function formatCurrency(num: number, currency: string = 'UZS'): string {
  const formatted = formatNumber(num, 0);
  return `${formatted} ${currency}`;
}

export function formatPercentage(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function round(num: number, decimals: number = 2): number {
  return Number(Math.round(Number(num + 'e' + decimals)) + 'e-' + decimals);
}

export function getChangeColor(value: number): string {
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
}

export function getChangeArrow(value: number): string {
  if (value > 0) return '↑';
  if (value < 0) return '↓';
  return '→';
}

export function getTrendColor(trend: number | undefined): string {
  if (trend === undefined) return 'gray';
  if (trend > 0) return 'green';
  if (trend < 0) return 'red';
  return 'gray';
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, length: number = 50): string {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function percentChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

export function getDurationString(start: Date, end: Date): string {
  const diff = end.getTime() - start.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}
