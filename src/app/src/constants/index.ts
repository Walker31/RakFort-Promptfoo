import {
  Article,
  People,
  VpnKey,
  Link,
  WarningAmber,
  DocumentScanner,
  Terminal,
  ListAlt,
  Settings,
  Home,
  History as HistoryIcon,
  Dataset as DatasetIcon,
  TextSnippet as PromptsIcon,
  Assessment as EvalIcon,
  Report as ReportIcon,
  Login as LoginIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";

export interface NavbarLinkItem {
  label: string;
  icon: SvgIconComponent;
  path: string;
}

export interface NavbarLinkGroup {
  title: string;
  links: NavbarLinkItem[];
}

// Only include routes that exist in your App router!
export const navbarLinks: NavbarLinkGroup[] = [
  {
    title: "",
    links: [
      { label: "Home", icon: Home, path: "/" },
      // If you want a Dashboard, uncomment the next line and add the page!
      { label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
      { label: "Datasets", icon: DatasetIcon, path: "/datasets" },
      { label: "Evals", icon: EvalIcon, path: "/evals" },
      { label: "Prompts", icon: PromptsIcon, path: "/prompts" },
      { label: "History", icon: HistoryIcon, path: "/history" },
      { label: "Login", icon: LoginIcon, path: "/login" },
    ],
  },
  {
    title: "Red Team",
    links: [
      { label: "Redteam Setup", icon: Link, path: "/redteam/setup" },
      { label: "Report", icon: ReportIcon, path: "/report" },
      { label: "Eval Creator", icon: EvalIcon, path: "/setup" },
      // You can add more if you add more routes
    ],
  },
  // Add more groups if you add more sections/routes
  {
    title: "Other",
    links: [
      { label: "Settings", icon: Settings, path: "/settings" },
      // Add more if needed
    ],
  },
];
