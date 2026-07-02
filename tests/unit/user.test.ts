import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hasReachedUploadLimit } from '@/lib/user';
import { getDbConnection } from '@/lib/database';
import { NeonQueryFunction } from '@neondatabase/serverless';

vi.mock('@/lib/database', () => {
  return {
    getDbConnection: vi.fn(),
  };
});

// Mock the pricingPlans constants to avoid environment variable dependency (NODE_ENV) during testing
vi.mock('@/utils/constants', () => {
  return {
    default: () => ({
      plans: [
        {
          id: "basic",
          title: "Basic",
          priceId: "price_basic_123",
        },
        {
          id: "pro",
          title: "Pro",
          priceId: "price_pro_123",
        },
      ],
    }),
  };
});

describe('hasReachedUploadLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return limit details for a Free tier user under the limit', async () => {
    const mockSql = vi.fn().mockImplementation((strings) => {
      const queryStr = strings.join('');
      if (queryStr.includes('count(*)')) {
        return [{ count: 2 }];
      }
      if (queryStr.includes('price_id')) {
        return []; // Free tier
      }
      return [];
    }) as unknown as NeonQueryFunction<false,false>

    vi.mocked(getDbConnection).mockResolvedValue(mockSql);

    const result = await hasReachedUploadLimit('user-123', 'free@example.com');

    expect(result).toEqual({
      hasReachedLimit: false,
      currentCount: 2,
      limit: 5,
      planName: undefined,
    });
  });

  it('should return hasReachedLimit true for a Free tier user at/above the limit', async () => {
    const mockSql = vi.fn().mockImplementation((strings) => {
      const queryStr = strings.join('');
      if (queryStr.includes('count(*)')) {
        return [{ count: 5 }];
      }
      if (queryStr.includes('price_id')) {
        return [];
      }
      return [];
    });

    vi.mocked(getDbConnection).mockResolvedValue(mockSql as any);

    const result = await hasReachedUploadLimit('user-123', 'free@example.com');

    expect(result.hasReachedLimit).toBe(true);
    expect(result.limit).toBe(5);
  });

  it('should return correct limits for a Pro tier user under the limit', async () => {
    const mockSql = vi.fn().mockImplementation((strings) => {
      const queryStr = strings.join('');
      if (queryStr.includes('count(*)')) {
        return [{ count: 100 }];
      }
      if (queryStr.includes('price_id')) {
        return [{ price_id: 'price_pro_123' }]; // Mocked Pro price ID
      }
      return [];
    });

    vi.mocked(getDbConnection).mockResolvedValue(mockSql as any);

    const result = await hasReachedUploadLimit('user-123', 'pro@example.com');

    expect(result).toEqual({
      hasReachedLimit: false,
      currentCount: 100,
      limit: 1000,
      planName: 'Pro',
    });
  });
});
