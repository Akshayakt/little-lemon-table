import { render, screen } from '@testing-library/react';
import App, { initializeTimes, updateTimes } from './App';


describe('initializeTimes', () => {
  test('should return an array of available times', () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
  });

  test('should return the correct default times', () => {
    const times = initializeTimes();
    expect(times).toEqual(['17:00', '18:00', '19:00', '20:00']);
  });

  test('should return exactly 4 time slots', () => {
    const times = initializeTimes();
    expect(times.length).toBe(4);
  });

  test('should return times in the correct format (HH:MM)', () => {
    const times = initializeTimes();
    const timeFormat = /^\d{2}:\d{2}$/;
    times.forEach(time => {
      expect(time).toMatch(timeFormat);
    });
  });
});

describe('updateTimes', () => {
  test('should return an array when called with a date', () => {
    const result = updateTimes([], '2025-12-25');
    expect(Array.isArray(result)).toBe(true);
  });

  test('should return the same times regardless of selected date (current implementation)', () => {
    const date1 = '2025-12-25';
    const date2 = '2025-12-26';
    const result1 = updateTimes([], date1);
    const result2 = updateTimes([], date2);
    expect(result1).toEqual(result2);
    expect(result1).toEqual(['17:00', '18:00', '19:00', '20:00']);
  });

  test('should return times even when state is empty array', () => {
    const result = updateTimes([], '2025-12-25');
    expect(result.length).toBeGreaterThan(0);
    expect(result).toEqual(['17:00', '18:00', '19:00', '20:00']);
  });

  test('should return times even when state has previous values', () => {
    const previousState = ['10:00', '11:00'];
    const result = updateTimes(previousState, '2025-12-25');
    expect(result).toEqual(['17:00', '18:00', '19:00', '20:00']);
  });

  test('should handle different date formats', () => {
    const dates = ['2025-12-25', '2025-01-01', '2026-06-15'];
    dates.forEach(date => {
      const result = updateTimes([], date);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(4);
    });
  });
});
