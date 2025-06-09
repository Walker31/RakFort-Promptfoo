import { create } from 'zustand';

interface UIState {
  isNavbarVisible: boolean;
  isDrawerCollapsed: boolean;
  isSidebarOpen: boolean;
  darkMode: boolean | null;

  // Toggle methods
  toggleNavbar: () => void;
  toggleDrawer: () => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  

  // Setters
  setNavbarVisible: (visible: boolean) => void;
  setDrawerCollapsed: (val: boolean) => void;
  setSidebarOpen: (val: boolean) => void;
  setDarkMode: (mode: boolean | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavbarVisible: true,
  isDrawerCollapsed: true,
  isSidebarOpen: false,
  darkMode: null,

  toggleNavbar: () =>
    set((state) => ({ isNavbarVisible: !state.isNavbarVisible })),

  toggleDrawer: () =>
    set((state) => ({ isDrawerCollapsed: !state.isDrawerCollapsed })),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  toggleDarkMode: () =>
    set((state) => {
      if (state.darkMode === null) return { darkMode: true };
      if (state.darkMode === true) return { darkMode: false };
      return { darkMode: null };
    }),

  setNavbarVisible: (visible) => set({ isNavbarVisible: visible }),
  setDrawerCollapsed: (val) => set({ isDrawerCollapsed: val }),
  setSidebarOpen: (val) => set({ isSidebarOpen: val }),
  setDarkMode: (mode: boolean | null) => set({ darkMode: mode }),
}));
