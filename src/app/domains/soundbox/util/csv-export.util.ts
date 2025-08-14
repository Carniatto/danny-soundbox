import { TestLogEntry } from '../data/types/testing.types';

/**
 * Generates CSV content from test log data
 * @param testLog - Array of test log entries
 * @returns CSV string content
 */
export function generateCSV(testLog: TestLogEntry[]): string {
  if (testLog.length === 0) {
    return '';
  }
  
  // Define CSV headers
  const headers = [
    'Position',
    'Timestamp',
    'Gyro_X',
    'Gyro_Y', 
    'Gyro_Z',
    'Accel_X',
    'Accel_Y',
    'Accel_Z'
  ];
  
  // Convert test log entries to CSV rows
  const rows = testLog.map(entry => [
    escapeCSVField(entry.position),
    entry.timestamp.toISOString(),
    entry.gyro.x.toFixed(6),
    entry.gyro.y.toFixed(6),
    entry.gyro.z.toFixed(6),
    entry.accel.x.toFixed(6),
    entry.accel.y.toFixed(6),
    entry.accel.z.toFixed(6)
  ]);
  
  // Combine headers and rows
  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');
  
  return csvContent;
}

/**
 * Escapes CSV field values to handle commas and quotes
 * @param field - Field value to escape
 * @returns Escaped field value
 */
export function escapeCSVField(field: string): string {
  // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

/**
 * Generates a filename for the CSV export
 * @param prefix - Optional prefix for the filename
 * @returns Formatted filename with timestamp
 */
export function generateCSVFilename(prefix: string = 'dualsense-test-log'): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `${prefix}-${timestamp}.csv`;
}

/**
 * Downloads CSV content as a file
 * @param csvContent - CSV string content
 * @param filename - Filename for the download
 */
export function downloadCSV(csvContent: string, filename: string): void {
  // Create blob with CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Exports test log to CSV and triggers download
 * @param testLog - Array of test log entries
 * @param filename - Optional custom filename
 */
export function exportTestLogToCSV(testLog: TestLogEntry[], filename?: string): void {
  if (testLog.length === 0) {
    console.warn('No test log data to export');
    return;
  }
  
  try {
    const csvContent = generateCSV(testLog);
    const finalFilename = filename || generateCSVFilename();
    
    downloadCSV(csvContent, finalFilename);
    console.log(`Test log exported successfully: ${finalFilename}`);
  } catch (error) {
    console.error('Failed to export test log:', error);
    throw new Error('CSV export failed');
  }
}

/**
 * Validates CSV content before export
 * @param csvContent - CSV string content to validate
 * @returns True if CSV content is valid
 */
export function validateCSVContent(csvContent: string): boolean {
  if (!csvContent || csvContent.trim().length === 0) {
    return false;
  }
  
  const lines = csvContent.split('\n');
  if (lines.length < 2) { // Need at least headers + 1 data row
    return false;
  }
  
  // Check if all lines have the same number of columns
  const expectedColumns = lines[0].split(',').length;
  return lines.every(line => line.split(',').length === expectedColumns);
}
