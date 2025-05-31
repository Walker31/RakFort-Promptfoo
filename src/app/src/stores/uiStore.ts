import { create } from 'zustand';

interface UIState {
  isNavbarVisible: boolean;
  isDrawerCollapsed: boolean;
  isSidebarOpen: boolean;

  // Toggle methods
  toggleNavbar: () => void;
  toggleDrawer: () => void;
  toggleSidebar: () => void;

  // Setters
  setNavbarVisible: (visible: boolean) => void;
  setDrawerCollapsed: (val: boolean) => void;
  setSidebarOpen: (val: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavbarVisible: true,
  isDrawerCollapsed: true,
  isSidebarOpen: false,

  toggleNavbar: () =>
    set((state) => ({ isNavbarVisible: !state.isNavbarVisible })),

  toggleDrawer: () =>
    set((state) => ({ isDrawerCollapsed: !state.isDrawerCollapsed })),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setNavbarVisible: (visible) => set({ isNavbarVisible: visible }),
  setDrawerCollapsed: (val) => set({ isDrawerCollapsed: val }),
  setSidebarOpen: (val) => set({ isSidebarOpen: val }),
}));
