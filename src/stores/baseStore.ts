import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const createBaseStore = <T extends object>(
  name: string,
  initializer: (set: any, get: any) => T
) => {
  // Combine devtools + persist middleware
  return create<T>()(
    devtools(
      persist(initializer, {
        name,
        partialize: (state) => ({ ...state }),
      }),
      { name }
    )
  );
};
