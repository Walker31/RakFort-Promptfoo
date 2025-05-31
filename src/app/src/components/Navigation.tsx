import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EngineeringIcon from '@mui/icons-material/Engineering';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { IS_RUNNING_LOCALLY } from '@app/constants';
import { useUIStore } from '../stores/uiStore';
import ApiSettingsModal from './ApiSettingsModal';
import DarkMode from './DarkMode';
import InfoModal from './InfoModal';
import Logo from './Logo';

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.active': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
});

function NavLink({ href, label }: { href: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(href);

  return (
    <Link
      to={href}
      className={`px-3 py-1 rounded text-sm sm:text-base
        ${isActive ? 'font-bold text-white bg-gray-700 dark:bg-gray-800' : 'text-gray-300 hover:underline hover:text-gray-100'}
      `}
    >
      {label}
    </Link>
  );
}

function CreateDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const isActive = ['/setup', '/redteam/setup'].some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <div className='bg-gray-300 rounded-3xl dark:bg-[#22103B]'>
      <NavButton
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        className={`text-white dark:text-black
          ${isActive ? 'bg-gray-50 dark:bg-gray-800' : ''}
          hover:bg-gray-700 dark:hover:bg-gray-800
        `}
      >
        <div className='text-gray-800 dark:text-white'>Create</div>
      </NavButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            className:
              'bg-amber-100 dark:bg-gray-800 rounded-lg shadow-lg text-black dark:text-white',
            sx: {
              mt: 1,
              borderRadius: 2,
              bgcolor: '#271243',
              color: 'white',
              boxShadow: 3,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1,
                fontSize: '0.9rem',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/setup">
          Eval
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/redteam/setup">
          Redteam
        </MenuItem>
      </Menu>
    </div>
  );
}

export default function Navigation({
  darkMode,
  onToggleDarkMode,
}: {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showApiSettingsModal, setShowApiSettingsModal] = useState(false);
  const { isNavbarVisible, isDrawerCollapsed, toggleDrawer, toggleSidebar } = useUIStore();
  const location = useLocation();

  const handleModalToggle = () => setShowInfoModal((prev) => !prev);
  const handleApiSettingsModalToggle = () => setShowApiSettingsModal((prev) => !prev);

  const showSidebarButton =
    location.pathname.startsWith('/redteam') || location.pathname.startsWith('/evals');

  if (!isNavbarVisible) return null;

  return (
    <>
      <StyledAppBar
        position="static"
        className="bg-gray-100 dark:bg-[#271243] shadow-md mb-4 h-12"
      >
        <Toolbar className="px-4 py-1 flex justify-between items-center bg-gray-100 dark:bg-[#271243]">

          {/* Left Section: Drawer toggle + Logo */}
          <div className="flex items-center gap-4">
            <IconButton
              onClick={toggleDrawer}
              className="text-gray-700 dark:!text-gray-50"
              title="Toggle Drawer"
            >
              <KeyboardDoubleArrowRightIcon className={isDrawerCollapsed ? '' : 'rotate-180'} />
            </IconButton>
            <Logo />
          </div>

          {/* Center (Optional Navigation) */}
          <div className="flex px-4 py-1 items-center justify-between">
            {/* <NavLink href="/prompts" label="Prompts" />
            <NavLink href="/datasets" label="Datasets" />
            <NavLink href="/history" label="History" /> */}
          </div>

          {/* Right Section: Info, Settings, Dark Mode, Sidebar Toggle */}
          <div className="flex items-center gap-4 ml-auto mr-2 text-gray-800 dark:text-gray-200">
            <CreateDropdown />

            <IconButton
              onClick={handleModalToggle}
              className="hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <InfoIcon className="text-gray-800 dark:text-white" />
            </IconButton>

            {IS_RUNNING_LOCALLY && (
              <Tooltip title="API and Sharing Settings">
                <IconButton
                  onClick={handleApiSettingsModalToggle}
                  className="hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <EngineeringIcon className="text-gray-800 dark:text-white" />
                </IconButton>
              </Tooltip>
            )}

            <DarkMode onToggleDarkMode={onToggleDarkMode} />

            {showSidebarButton && (
              <IconButton
                onClick={toggleSidebar}
                className="text-gray-700 dark:!text-gray-50"
                title="Toggle Sidebar"
              >
                <MenuIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </StyledAppBar>

      <InfoModal open={showInfoModal} onClose={handleModalToggle} />
      <ApiSettingsModal open={showApiSettingsModal} onClose={handleApiSettingsModalToggle} />
    </>
  );
}
