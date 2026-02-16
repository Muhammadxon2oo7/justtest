// Test file disabled - API-ga ko'chirilgan
// Tests migrated to API routes

/**
describe('Inequality Calculations', () => {
  describe('Coefficient of Variation', () => {
    test('should calculate CV for normal distribution', () => {
      const cv = calculateCV([1, 2, 3, 4, 5]);
      expect(cv).toBeGreaterThan(0);
      expect(cv).toBeLessThan(100);
    });

    test('should return 0 for identical values', () => {
      const cv = calculateCV([5, 5, 5]);
      expect(cv).toBe(0);
    });

    test('should handle empty array', () => {
      const cv = calculateCV([]);
      expect(cv).toBe(0);
    });
  });

  describe('Gini Coefficient', () => {
    test('should return 0 for perfect equality', () => {
      const gini = calculateGini([5, 5, 5]);
      expect(gini).toBeCloseTo(0, 5);
    });

    test('should calculate Gini between 0 and 1', () => {
      const gini = calculateGini([1, 2, 3, 4, 5]);
      expect(gini).toBeGreaterThan(0);
      expect(gini).toBeLessThan(1);
    });

    test('should handle extreme inequality', () => {
      const gini = calculateGini([1, 1, 1, 100]);
      expect(gini).toBeGreaterThan(0.5);
    });
  });

  describe('Theil Index', () => {
    test('should calculate Theil correctly', () => {
      const theil = calculateTheil([1, 2, 3, 4, 5]);
      expect(theil).toBeGreaterThan(0);
    });

    test('should return 0 for equal distribution', () => {
      const theil = calculateTheil([5, 5, 5]);
      expect(theil).toBeCloseTo(0, 5);
    });
  });

  describe('Standard Deviation', () => {
    test('should calculate standard deviation', () => {
      const stdDev = calculateStdDev([1, 2, 3, 4, 5]);
      expect(stdDev).toBeGreaterThan(0);
    });

    test('should return 0 for identical values', () => {
      const stdDev = calculateStdDev([5, 5, 5]);
      expect(stdDev).toBe(0);
    });
  });
});
*/
