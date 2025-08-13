import { describe, it, expect } from 'vitest';

describe('Basic Test Suite', () => {
  it('should run basic tests', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const title = 'danny-soundbox';
    expect(title).toBe('danny-soundbox');
    expect(title.length).toBe(14);
  });

  it('should work with arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers[0]).toBe(1);
    expect(numbers[4]).toBe(5);
  });
});
