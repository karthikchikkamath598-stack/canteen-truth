import React from 'react';
import {
  Home,
  Database,
  GitCommit,
  Calculator,
  AlertTriangle,
  BarChart,
  CheckCircle,
  BookOpen
} from 'lucide-react';

export const SECTIONS = [
  { id: 'home', label: '1. Home / Scenario', icon: Home },
  { id: 'input', label: '2. Enter Sample Data', icon: Database },
  { id: 'hypothesis', label: '3. Hypothesis Setup', icon: GitCommit },
  { id: 'calculation', label: '4. Statistical Calculation', icon: Calculator },
  { id: 'errors', label: '5. Error Analysis', icon: AlertTriangle },
  { id: 'visualization', label: '6. Visualization', icon: BarChart },
  { id: 'decision', label: '7. Final Decision', icon: CheckCircle },
  { id: 'learn', label: '8. Learn the Concept', icon: BookOpen }
];

export default function Navbar({ activeSection, setActiveSection }) {
  return (
    <nav className="sidebar">
      {SECTIONS.map((sec) => {
        const Icon = sec.icon;
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveSection(sec.id)}
          >
            <span className="nav-icon">
              <Icon size={18} />
            </span>
            <span>{sec.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
