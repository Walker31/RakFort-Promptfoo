import React from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  Apps as AppIcon,
  Extension as PluginIcon,
  FolderOpen as FolderOpenIcon,
  GpsFixed as TargetIcon,
  Psychology as StrategyIcon,
  RateReview as ReviewIcon,
  RestartAlt as RestartAltIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/material-icons';

interface SidebarProps {
  configName: string;
  configDate: string | null;
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onOpenSave: () => void;
  onOpenLoad: () => void;
  onOpenReset: () => void;
  pluginsCount: number;
  strategiesCount: number;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  configName,
  configDate,
  hasUnsavedChanges,
  onSave,
  onOpenSave,
  onOpenLoad,
  onOpenReset,
  pluginsCount,
  strategiesCount,
  value,
  onChange,
  isOpen = true,
  onClose,
}) => {
  const redteamTabs = [
    { label: 'Usage Details', icon: <AppIcon /> },
    { label: 'Targets', icon: <TargetIcon /> },
    {
      label: `Plugins${pluginsCount ? ` (${pluginsCount})` : ''}`,
      icon: <PluginIcon />,
    },
    {
      label: `Strategies${strategiesCount ? ` (${strategiesCount})` : ''}`,
      icon: <StrategyIcon />,
    },
    { label: 'Review', icon: <ReviewIcon /> },
  ];

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '96px', // top-24 = 6rem = 96px
        right: '24px', // right-6 = 1.5rem = 24px
        width: '300px',
        maxHeight: '80vh',
        zIndex: 50,
        transition: 'all 0.5s ease',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        borderRadius: '16px', // rounded-2xl
        backdropFilter: 'blur(16px)',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(28, 28, 40, 0.6)'
            : 'rgba(255, 255, 255, 0.7)',
        border: (theme) =>
          theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box 
        sx={{
          padding: '16px',
          borderBottom: (theme) => 
            theme.palette.mode === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgb(209, 213, 219)',
          position: 'relative'
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? '#fbbf24' // amber-400
                : '#111827', // gray-900
            textAlign: 'center'
          }}
        >
          {configName ? `Config: ${configName}` : 'New Configuration'}
        </Typography>
        {onClose && (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: (theme) =>
                theme.palette.mode === 'dark'
                  ? '#d1d5db' // gray-300
                  : '#374151' // gray-700
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Save warning or last saved timestamp */}
      {hasUnsavedChanges ? (
        <div 
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            color: '#78350f', // yellow-900 for light mode
            backgroundColor: '#fef3c7', // yellow-100 for light mode
            ...(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && {
              backgroundColor: 'rgba(146, 64, 14, 0.3)', // yellow-900/30 for dark mode
              color: '#fcd34d' // yellow-300 for dark mode
            })
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '18px' }}>●</span> Unsaved changes
            </span>
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={onSave}
              disabled={!configName}
              sx={{
                padding: '4px 8px',
                fontSize: '12px'
              }}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        configDate && (
          <div 
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              color: '#374151' // gray-700 for light mode
            }}
          >
            Last saved: {new Date(configDate).toLocaleString()}
          </div>
        )
      )}

      <Divider />

      {/* Main Content - Tabs */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={onChange}
          sx={{ width: '100%' }}
        >
          {redteamTabs.map(({ label, icon }, idx) => (
            <Tab
              key={label}
              icon={icon}
              label={label}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                minHeight: '48px',
                paddingX: '16px',
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '#ffffff'
                    : '#1f2937', // gray-800
                borderBottom: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgb(229, 231, 235)' // gray-200
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Footer Actions */}
      <Divider />
      <Box 
        sx={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '16px',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(12px)',
          borderTop: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgb(229, 231, 235)' // gray-200
        }}
      >
        <Button
          variant="text"
          fullWidth
          startIcon={
            <SaveIcon 
              sx={{ 
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '#e5e7eb' // gray-200
                    : '#4b5563' // gray-600
              }} 
            />
          }
          onClick={onOpenSave}
          sx={{
            justifyContent: 'flex-start',
            fontSize: '14px',
            fontWeight: 400,
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? '#1f2937' // gray-800
                  : '#f3f4f6' // gray-100
            }
          }}
        >
          <span 
            style={{ 
              color: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? '#e5e7eb' // gray-200 for dark mode
                : '#374151' // gray-700 for light mode
            }}
          >
            Save Config
          </span>
        </Button>
        <Button
          variant="text"
          fullWidth
          startIcon={
            <FolderOpenIcon 
              sx={{ 
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '#e5e7eb' // gray-200
                    : '#4b5563' // gray-600
              }} 
            />
          }
          onClick={onOpenLoad}
          sx={{
            justifyContent: 'flex-start',
            fontSize: '14px',
            fontWeight: 400,
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? '#1f2937' // gray-800
                  : '#f3f4f6' // gray-100
            }
          }}
        >
          <span 
            style={{ 
              color: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? '#e5e7eb' // gray-200 for dark mode
                : '#374151' // gray-700 for light mode
            }}
          >
            Load Config
          </span>
        </Button>
        <Button
          variant="text"
          fullWidth
          startIcon={
            <RestartAltIcon 
              sx={{ 
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '#e5e7eb' // gray-200
                    : '#4b5563' // gray-600
              }} 
            />
          }
          onClick={onOpenReset}
          sx={{
            justifyContent: 'flex-start',
            fontSize: '14px',
            fontWeight: 400,
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? '#1f2937' // gray-800
                  : '#f3f4f6' // gray-100
            }
          }}
        >
          <span 
            style={{ 
              color: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? '#e5e7eb' // gray-200 for dark mode
                : '#374151' // gray-700 for light mode
            }}
          >
            Reset Config
          </span>
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;