import { Scheme, User, UserRole } from '../types';
import { INITIAL_SCHEMES } from '../constants';

const SCHEMES_KEY = 'raitha_mitra_schemes';
const USER_KEY = 'raitha_mitra_user';
const USERS_DB_KEY = 'raitha_mitra_users_db';

interface StoredUser extends User {
  password?: string;
}

// Initialize schemes if empty
// Safe localStorage helpers (guard against environments where localStorage
// is unavailable or throws, e.g., certain private browsing modes)
const safeGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn('localStorage.getItem failed for', key, e);
    return null;
  }
};

const safeSet = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('localStorage.setItem failed for', key, e);
  }
};

const initSchemes = () => {
  const existing = safeGet(SCHEMES_KEY);
  if (!existing) {
    safeSet(SCHEMES_KEY, JSON.stringify(INITIAL_SCHEMES));
  }
};

// Initialize Users if empty (Seed Admin)
const initUsers = () => {
  const existing = safeGet(USERS_DB_KEY);
  if (!existing) {
    const defaultAdmin: StoredUser = {
      username: 'admin',
      password: 'password123', // Default admin password
      role: UserRole.ADMIN
    };
    safeSet(USERS_DB_KEY, JSON.stringify([defaultAdmin]));
  }
};

initSchemes();
initUsers();

export const StorageService = {
  getSchemes: (): Scheme[] => {
    const data = safeGet(SCHEMES_KEY);
    return data ? JSON.parse(data) : [];
  },

  addScheme: (scheme: Omit<Scheme, 'id' | 'lastUpdated'>): Scheme => {
    const schemes = StorageService.getSchemes();
    const newScheme: Scheme = {
      ...scheme,
      id: Math.random().toString(36).substr(2, 9),
      lastUpdated: new Date().toISOString()
    };
    safeSet(SCHEMES_KEY, JSON.stringify([newScheme, ...schemes]));
    return newScheme;
  },

  updateScheme: (id: string, updates: Partial<Scheme>): void => {
    const schemes = StorageService.getSchemes();
    const updatedSchemes = schemes.map(s => s.id === id ? { ...s, ...updates, lastUpdated: new Date().toISOString() } : s);
    safeSet(SCHEMES_KEY, JSON.stringify(updatedSchemes));
  },

  deleteScheme: (id: string): void => {
    const schemes = StorageService.getSchemes();
    const filtered = schemes.filter(s => s.id !== id);
    safeSet(SCHEMES_KEY, JSON.stringify(filtered));
  },

  // User Management Methods
  getUsers: (): User[] => {
    const usersRaw = safeGet(USERS_DB_KEY);
    if (!usersRaw) return [];
    // Return users without passwords
    const users: StoredUser[] = JSON.parse(usersRaw);
    return users.map(u => ({ username: u.username, role: u.role }));
  },

  deleteUser: (username: string): void => {
    if (username === 'admin') {
      throw new Error('Cannot delete the default administrator account.');
    }
    const usersRaw = safeGet(USERS_DB_KEY);
    if (!usersRaw) return;
    let users: StoredUser[] = JSON.parse(usersRaw);
    users = users.filter(u => u.username !== username);
    safeSet(USERS_DB_KEY, JSON.stringify(users));
  },

  // Auth Methods
  register: (username: string, password: string): User => {
    const usersRaw = safeGet(USERS_DB_KEY);
    const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : [];

    if (users.find(u => u.username === username)) {
      throw new Error('Username already exists');
    }

    const newUser: StoredUser = {
      username,
      password,
      role: UserRole.FARMER // Only farmers register via the public UI
    };

    users.push(newUser);
    safeSet(USERS_DB_KEY, JSON.stringify(users));
    
    // Auto login
    const sessionUser = { username: newUser.username, role: newUser.role };
    safeSet(USER_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  },

  login: (username: string, password: string, role: UserRole): User => {
    const usersRaw = safeGet(USERS_DB_KEY);
    const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : [];

    const user = users.find(u => u.username === username && u.role === role);

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const sessionUser = { username: user.username, role: user.role };
    safeSet(USER_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  },

  logout: (): void => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.warn('localStorage.removeItem failed for', USER_KEY, e);
    }
  },

  getCurrentUser: (): User | null => {
    const data = safeGet(USER_KEY);
    return data ? JSON.parse(data) : null;
  }
};