// ✅ داده‌های کاربران برای نمایش در لیدربورد و سایر بخش‌ها

export interface User {
  id: string;
  username: string;
  score: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  lastActive: string; // ISO date string
}

// ✅ داده‌های نمونه برای کاربران
export const sampleUsers: User[] = [
  {
    id: '1',
    username: 'علی',
    score: 1250,
    gamesPlayed: 42,
    wins: 30,
    losses: 10,
    draws: 2,
    lastActive: '2025-06-05T14:30:00Z'
  },
  {
    id: '2',
    username: 'سارا',
    score: 1180,
    gamesPlayed: 38,
    wins: 25,
    losses: 8,
    draws: 5,
    lastActive: '2025-06-05T16:45:00Z'
  },
  {
    id: '3',
    username: 'محمد',
    score: 1120,
    gamesPlayed: 35,
    wins: 22,
    losses: 10,
    draws: 3,
    lastActive: '2025-06-04T18:20:00Z'
  },
  {
    id: '4',
    username: 'فاطمه',
    score: 1050,
    gamesPlayed: 30,
    wins: 18,
    losses: 9,
    draws: 3,
    lastActive: '2025-06-05T10:15:00Z'
  },
  {
    id: '5',
    username: 'رضا',
    score: 980,
    gamesPlayed: 28,
    wins: 15,
    losses: 8,
    draws: 5,
    lastActive: '2025-06-04T22:10:00Z'
  },
  {
    id: '6',
    username: 'مریم',
    score: 920,
    gamesPlayed: 25,
    wins: 14,
    losses: 7,
    draws: 4,
    lastActive: '2025-06-05T09:30:00Z'
  },
  {
    id: '7',
    username: 'حسین',
    score: 870,
    gamesPlayed: 22,
    wins: 12,
    losses: 6,
    draws: 4,
    lastActive: '2025-06-03T17:45:00Z'
  },
  {
    id: '8',
    username: 'زهرا',
    score: 820,
    gamesPlayed: 20,
    wins: 10,
    losses: 5,
    draws: 5,
    lastActive: '2025-06-04T14:20:00Z'
  },
  {
    id: '9',
    username: 'امیر',
    score: 780,
    gamesPlayed: 18,
    wins: 9,
    losses: 6,
    draws: 3,
    lastActive: '2025-06-05T11:10:00Z'
  },
  {
    id: '10',
    username: 'نیلوفر',
    score: 750,
    gamesPlayed: 16,
    wins: 8,
    losses: 5,
    draws: 3,
    lastActive: '2025-06-04T19:30:00Z'
  },
  {
    id: '11',
    username: 'کاربر جدید',
    score: 500,
    gamesPlayed: 10,
    wins: 5,
    losses: 3,
    draws: 2,
    lastActive: '2025-06-05T20:00:00Z'
  }
];

// ✅ تابع برای دریافت کاربران برتر
export function getTopUsers(limit: number = 10): User[] {
  return [...sampleUsers]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// ✅ تابع برای جستجوی کاربر با نام کاربری
export function findUserByUsername(username: string): User | undefined {
  return sampleUsers.find(user => 
    user.username.toLowerCase() === username.toLowerCase()
  );
}