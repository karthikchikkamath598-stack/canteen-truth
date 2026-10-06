import React from 'react';
import { Play, RotateCcw, FileText, Info, Award, BarChart2, Layers } from 'lucide-react';

export default function Header({
  onOpenPresentation,
  onOpenSimulation,
  onOpenSampleSizeComp,
  onExportReport,
  onOpenAbout
}) {
  return (
    <header className="top-bar">
      <div className="brand-section">
        <div className="brand-icon">🥤</div>
        <div>
          <div className="brand-title">
            Canteen Truth Detector
            <span className="academic-chip">Module VII — Testing of Hypothesis – I</span>
          </div>
          <div className="brand-subtitle">“Can Statistics Verify the Canteen's Claim?”</div>
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="btn btn-primary"
          onClick={onOpenPresentation}
          title="College Presentation Slide Mode"
        >
          <Award size={16} /> 🎓 Presentation Mode
        </button>

        <button
          className="btn btn-purple"
          onClick={onOpenSimulation}
          title="Interactive Monte Carlo Canteen Sample Simulation"
        >
          <Play size={16} /> 🎲 Simulate Samples
        </button>

        <button
          className="btn"
          onClick={onOpenSampleSizeComp}
          title="Compare Effect of Sample Size n"
        >
          <BarChart2 size={16} /> 📊 Sample Size (n) Effect
        </button>

        <button
          className="btn btn-success"
          onClick={onExportReport}
          title="Export / Print Formal Analysis Report"
        >
          <FileText size={16} /> 📄 Export Analysis
        </button>

        <button
          className="btn"
          onClick={onOpenAbout}
          title="Project & Team Member Details"
        >
          <Info size={16} /> ℹ️ About Project
        </button>
      </div>
    </header>
  );
}
