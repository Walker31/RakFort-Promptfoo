import React, { useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useUIStore } from '@app/stores/uiStore';
import { Drawer } from './Drawer';
import Navigation from './Navigation.tsx';

// Theme factory
const createAppTheme = (darkMode: boolean) =>
  createTheme({
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#3b82f6' : '#2563eb',
        light: darkMode ? '#60a5fa' : '#3b82f6',
        dark: darkMode ? '#2563eb' : '#1d4ed8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed',
        contrastText: '#ffffff',
      },
      background: {
        default: darkMode ? '#121212' : '#f8fafc',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#0f172a',
        secondary: darkMode ? '#a0a0a0' : '#475569',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 16px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 8px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            borderRadius: '16px',
            border: `1px solid ${darkMode ? '#2c2c2c' : '#e2e8f0'}`,
            transition: 'all 0.2s ease-in-out',
            boxShadow: darkMode
              ? 'none'
              : '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: darkMode
                ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                : '0 4px 12px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05)',
            },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            boxShadow: darkMode
              ? 'none'
              : '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            border: `1px solid ${darkMode ? '#2c2c2c' : '#e2e8f0'}`,
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#f8fafc',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: 'inherit',
            color: darkMode ? '#ffffff' : '#0f172a',
            fontWeight: 600,
            fontSize: '0.875rem',
          },
          stickyHeader: {
            backgroundColor: darkMode ? '#1e1e1e' : '#f8fafc',
          },
          root: {
            borderBottom: `1px solid ${darkMode ? '#2c2c2c' : '#e2e8f0'}`,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              transition: 'all 0.2s ease-in-out',
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            transition: 'color 0.2s ease-in-out',
            '&.Mui-focused': {
              color: darkMode ? '#3b82f6' : '#2563eb',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            boxShadow: 'none',
            borderBottom: `1px solid ${darkMode ? '#2c2c2c' : '#e2e8f0'}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            boxShadow: darkMode ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${darkMode ? '#2c2c2c' : '#e2e8f0'}`,
            '&[class*="elevation"]': {
              boxShadow: darkMode ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)',
            },
          },
          elevation1: {
            boxShadow: darkMode ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)',
          },
          elevation2: {
            boxShadow: darkMode
              ? 'none'
              : '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
          },
          elevation3: {
            boxShadow: darkMode
              ? '0 4px 12px rgba(0, 0, 0, 0.3)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
          },
          elevation4: {
            boxShadow: darkMode
              ? '0 8px 16px rgba(0, 0, 0, 0.4)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '16px',
            boxShadow: darkMode
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 8,
          },
          track: {
            borderRadius: 22 / 2,
            backgroundColor: darkMode ? '#404040' : '#cbd5e1',
          },
          thumb: {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
  });export default function PageShell() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const darkMode = useUIStore((state) => state.darkMode);
  const setDarkMode = useUIStore((state) => state.setDarkMode);

  // Extract all UI state needed for layout
  const isDrawerCollapsed = useUIStore((state) => state.isDrawerCollapsed);
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  // If you want to show the right sidebar only on certain routes, define showRightSidebar here:
  // Example: show only on /redteam or /evals routes
  const showRightSidebar = window.location.pathname.startsWith('/redteam') ||
    window.location.pathname.startsWith('/evals');

  const theme = createAppTheme(darkMode ?? prefersDarkMode);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === null) {
      setDarkMode(prefersDarkMode);
    } else {
      setDarkMode(savedMode === 'true');
    }
  }, [prefersDarkMode, setDarkMode]);

  useEffect(() => {
    if (darkMode === null) return;
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    const newMode = darkMode === null ? true : !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  }, [darkMode, setDarkMode]);

  if (darkMode === null) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen flex flex-col overflow-hidden dark:bg-[#22103B]">
        {/* Top Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        </div>

        {/* Body below navbar */}
        <div className="flex flex-1 pt-[64px] h-full overflow-hidden">
          {/* Left Drawer */}
          <div className={`${isDrawerCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
            <Drawer collapsed={isDrawerCollapsed} />
          </div>

          {/* Main content area */}
          <div className="flex flex-1 h-full overflow-hidden">

            {/* Scrollable Page Content */}
            <main className="flex-1 overflow-y-auto min-h-0">
              <div className="h-full w-full">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}