import React, { forwardRef, useState } from "react";
import { navbarLinks } from "../constants/index";
import { NavLink } from "react-router-dom";

interface NavbarLinkItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface NavbarLinkGroup {
  title: string;
  links: NavbarLinkItem[];
}

interface DrawerProps {
  collapsed?: boolean;
}

export const Drawer = forwardRef<HTMLElement, DrawerProps>(({ collapsed = false }, ref) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const drawerStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 100,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    backgroundColor: "#f5f3ff",
    color: "#1a1a1a",
    transition: "width 300ms, left 300ms, background-color 150ms, border 150ms",
    paddingLeft: 0,
    paddingRight: 0,
    left: collapsed ? "-100%" : "0",
    width: collapsed ? 70 : 240,
  };

  const drawerContentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY: "auto",
    padding: "12px",
    width: "100%",
  };

  const drawerSectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  };

  const drawerDividerStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #94a3b8", // slate-300
    marginBottom: "0.5rem",
  };

  const drawerTitleStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    fontWeight: 600,
    color: "#64748b", // slate-500
    paddingLeft: "8px",
  };

  const linkBaseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    transition: "background-color 0.2s",
    color: "#334155", // slate-700
  };

  const activeLinkStyle: React.CSSProperties = {
    backgroundColor: "#c4b5fd", // purple-300
    color: "white",
  };

  const collapsedLinkStyle: React.CSSProperties = {
    justifyContent: "center",
    width: 45,
  };

  const expandedLinkStyle: React.CSSProperties = {
    width: "100%",
  };

  const drawerLabelStyle: React.CSSProperties = {
    whiteSpace: "nowrap",
    fontSize: "0.875rem",
    fontWeight: 500,
  };

  return (
    <aside ref={ref} style={drawerStyle}>
      <div style={drawerContentStyle}>
        {(navbarLinks as NavbarLinkGroup[]).map((navbarLink, index) => (
          <nav key={navbarLink.title} style={drawerSectionStyle}>
            {index !== 0 && <hr style={drawerDividerStyle} />}
            {!collapsed && <p style={drawerTitleStyle}>{navbarLink.title}</p>}

            {navbarLink.links.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={label}
                to={path}
                style={({ isActive }) => ({
                  ...linkBaseStyle,
                  ...(collapsed ? collapsedLinkStyle : expandedLinkStyle),
                  ...(isActive ? activeLinkStyle : {}),
                })}
              >
                <Icon size={22} />
                {!collapsed && <span style={drawerLabelStyle}>{label}</span>}
              </NavLink>
            ))}
          </nav>
        ))}
      </div>
    </aside>
  );
});

Drawer.displayName = "Drawer";
