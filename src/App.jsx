import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import DataInputSection from './components/DataInputSection';
import HypothesisSetupSection from './components/HypothesisSetupSection';
import StatisticalCalculationsSection from './components/StatisticalCalculationsSection';
import CalculationBreakdownSection from './components/CalculationBreakdownSection';
import HowWeDecidedTimeline from './components/HowWeDecidedTimeline';
import ErrorAnalysisSection from './components/ErrorAnalysisSection';
import VisualizationSection from './components/VisualizationSection';
import FinalDecisionSection from './components/FinalDecisionSection';
import LearnConceptSection from './components/LearnConceptSection';

import SimulationModal from './components/SimulationModal';
import SampleSizeComparisonSection from './components/SampleSizeComparisonSection';
import PresentationModeModal from './components/PresentationModeModal';
import AboutModal from './components/AboutModal';

import { calculateOneSampleTTest, PRESET_DATASETS } from './utils/stats';
import { generatePrintableReport } from './utils/report';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Core statistical inputs
  const defaultPreset = PRESET_DATASETS[0];
  const [claimedMean, setClaimedMean] = useState(defaultPreset.claimedMean);
  const [alpha, setAlpha] = useState(defaultPreset.alpha);
  const [sampleList, setSampleList] = useState(defaultPreset.values);
  const [rawInputString, setRawInputString] = useState(defaultPreset.values.join(', '));
  const [inputMode, setInputMode] = useState('string');

  // Modals state
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [isSampleSizeCompOpen, setIsSampleSizeCompOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // About info state with localStorage persistence
  const [aboutInfo, setAboutInfo] = useState(() => {
    const saved = localStorage.getItem('canteen_truth_about');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      collegeName: 'College of Engineering & Technology',
      teamMembers: [
        'Team Member 1',
        'Team Member 2',
        'Team Member 3',
        'Team Member 4',
        'Team Member 5',
        'Team Member 6'
      ]
    };
  });

  // Calculate stats dynamically on state change
  const testResult = useMemo(() => {
    return calculateOneSampleTTest(sampleList, claimedMean, alpha);
  }, [sampleList, claimedMean, alpha]);

  // Handle Preset Select
  const handleSelectPreset = (preset) => {
    setClaimedMean(preset.claimedMean);
    setAlpha(preset.alpha);
    setSampleList(preset.values);
    setRawInputString(preset.values.join(', '));
  };

  // Reset to default
  const handleReset = () => {
    handleSelectPreset(PRESET_DATASETS[0]);
  };

  // Apply simulated data
  const handleApplySimulatedData = (values, newClaimedMean, newAlpha) => {
    setSampleList(values);
    setRawInputString(values.join(', '));
    if (newClaimedMean) setClaimedMean(newClaimedMean);
    if (newAlpha) setAlpha(newAlpha);
    setActiveSection('input');
  };

  // Trigger Printable Report
  const handleExportReport = () => {
    if (!testResult || !testResult.isValid) {
      alert('Please enter valid sample data before exporting report.');
      return;
    }
    generatePrintableReport(testResult, aboutInfo);
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header
        onOpenPresentation={() => setIsPresentationOpen(true)}
        onOpenSimulation={() => setIsSimulationOpen(true)}
        onOpenSampleSizeComp={() => setIsSampleSizeCompOpen(true)}
        onExportReport={handleExportReport}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Viewport Grid */}
      <div className="main-wrapper">
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

        <main className="content-viewport">
          {activeSection === 'home' && (
            <HomeSection
              onSelectPreset={handleSelectPreset}
              onNavigateToInput={() => setActiveSection('input')}
            />
          )}

          {activeSection === 'input' && (
            <DataInputSection
              claimedMean={claimedMean}
              setClaimedMean={setClaimedMean}
              alpha={alpha}
              setAlpha={setAlpha}
              sampleList={sampleList}
              setSampleList={setSampleList}
              rawInputString={rawInputString}
              setRawInputString={setRawInputString}
              inputMode={inputMode}
              setInputMode={setInputMode}
              onReset={handleReset}
              validationResult={testResult}
            />
          )}

          {activeSection === 'hypothesis' && (
            <HypothesisSetupSection
              claimedMean={claimedMean}
              isRejected={testResult.isRejected}
            />
          )}

          {activeSection === 'calculation' && (
            <>
              <StatisticalCalculationsSection testResult={testResult} />
              <CalculationBreakdownSection testResult={testResult} />
              <HowWeDecidedTimeline testResult={testResult} />
            </>
          )}

          {activeSection === 'errors' && (
            <ErrorAnalysisSection testResult={testResult} />
          )}

          {activeSection === 'visualization' && (
            <VisualizationSection testResult={testResult} />
          )}

          {activeSection === 'decision' && (
            <>
              <FinalDecisionSection testResult={testResult} />
              <CalculationBreakdownSection testResult={testResult} />
            </>
          )}

          {activeSection === 'learn' && (
            <LearnConceptSection />
          )}
        </main>
      </div>

      {/* Modals & Fullscreen Overlays */}
      <SimulationModal
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
        onApplySimulatedData={handleApplySimulatedData}
      />

      {isSampleSizeCompOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '1000px' }}>
            <div className="modal-header">
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                📊 Sample Size Effect Analysis
              </h2>
              <button className="btn-close" onClick={() => setIsSampleSizeCompOpen(false)}>×</button>
            </div>
            <SampleSizeComparisonSection />
          </div>
        </div>
      )}

      <PresentationModeModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        testResult={testResult}
        aboutInfo={aboutInfo}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        aboutInfo={aboutInfo}
        setAboutInfo={setAboutInfo}
      />
    </div>
  );
}
