/**
 * localStorage Helper Utilities
 * 
 * Type-safe wrapper around localStorage with error handling.
 * 
 * **Usage:**
 * ```typescript
 * import { storage } from '@/lib/storage';
 * 
 * // Save data
 * storage.set('user_preferences', { theme: 'dark' });
 * 
 * // Get data
 * const prefs = storage.get<{ theme: string }>('user_preferences');
 * 
 * // Check if exists
 * if (storage.has('onboarding_complete')) { ... }
 * 
 * // Remove data
 * storage.remove('temp_data');
 * ```
 */

/**
 * Storage keys used throughout the app
 * Centralized to prevent typos and enable refactoring
 */
export const STORAGE_KEYS = {
  // Authentication
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  
  // Legal
  LEGAL_CONSENTS: 'legal_consents',
  MENTOR_AGREEMENT_ACCEPTED: 'mentor_agreement_accepted',
  
  // Instagram
  INSTAGRAM_WAITLIST_EMAIL: 'instagram_waitlist_email',
  
  // User Preferences
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  
  // Onboarding
  ONBOARDING_COMPLETE: 'onboarding_complete',
  
  // Demo Data
  DEMO_MODE: 'demo_mode',
} as const;

/**
 * Check if localStorage is available
 * Some browsers block localStorage in private/incognito mode
 */
function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get item from localStorage with type safety
 * @param key Storage key
 * @param defaultValue Default value if key doesn't exist
 * @returns Parsed value or default value
 */
function get<T>(key: string, defaultValue?: T): T | null {
  if (!isStorageAvailable()) {
    console.warn('localStorage is not available');
    return defaultValue ?? null;
  }

  try {
    const item = localStorage.getItem(key);
    
    if (item === null) {
      return defaultValue ?? null;
    }

    // Try to parse JSON, return raw string if parsing fails
    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return defaultValue ?? null;
  }
}

/**
 * Set item in localStorage
 * Automatically stringifies objects
 * @param key Storage key
 * @param value Value to store
 */
function set<T>(key: string, value: T): void {
  if (!isStorageAvailable()) {
    console.warn('localStorage is not available');
    return;
  }

  try {
    const serialized = typeof value === 'string' 
      ? value 
      : JSON.stringify(value);
    
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error writing to localStorage (key: ${key}):`, error);
  }
}

/**
 * Check if key exists in localStorage
 * @param key Storage key
 * @returns true if key exists
 */
function has(key: string): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  return localStorage.getItem(key) !== null;
}

/**
 * Remove item from localStorage
 * @param key Storage key
 */
function remove(key: string): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
  }
}

/**
 * Clear all items from localStorage
 * Use with caution - clears everything!
 */
function clear(): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Get all keys in localStorage
 * @returns Array of storage keys
 */
function keys(): string[] {
  if (!isStorageAvailable()) {
    return [];
  }

  return Object.keys(localStorage);
}

/**
 * Get storage size in bytes (approximate)
 * @returns Size in bytes
 */
function getSize(): number {
  if (!isStorageAvailable()) {
    return 0;
  }

  let total = 0;
  
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }

  return total;
}

/**
 * Format storage size in human-readable format
 * @returns Formatted string (e.g., "2.5 KB")
 */
function getSizeFormatted(): string {
  const bytes = getSize();
  
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Exported storage utility object
 */
export const storage = {
  get,
  set,
  has,
  remove,
  clear,
  keys,
  getSize,
  getSizeFormatted,
  isAvailable: isStorageAvailable,
};
