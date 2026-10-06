import React, { useState } from 'react';
import { generateSimulatedData, calculateOneSampleTTest } from '../utils/stats';
import { Play, RotateCcw, X, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function SimulationModal({ isOpen, onClose, onApplySimulatedData }) {
  const [trueMean, setTrueMean] = useState(245);
  const [sampleSize, setSampleSize] = useState(30);
  const [variationSD, setVariationSD] = useState(6);
  const [claimedMean, setClaimedMean] = useState(250);
  const [alpha, setAlpha] = useState(0.05);

  const [simResult, setSimResult] = useState(null);

  if (!isOpen) return null;

  const handleRunSimulation = () => {
    const generatedValues = generateSimulatedData(trueMean, sampleSize, variationSD);
    const test = calculateOneSampleTTest(generatedValues, claimedMean, alpha);
    setSimResult({
      values: generatedValues,
      test
    });
  };

  const handleApplyToMainDashboard = () => {
    if (simResult && simResult.test) {
      onApplySimulatedData(simResult.values, claimedMean, alpha);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎲 Simulate Canteen Samples (Monte Carlo Generator)
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>
              Experiment with true underlying canteen distributions to see how hypothesis testing detects shortage or honesty.
            </p>
          </div>
          <button className="btn-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div className="form-group">
            <label className="form-label">Actual True Serving Mean (ml)</label>
            <input
              type="number"
              className="form-control"
              value={trueMean}
              onChange={(e) => setTrueMean(parseFloat(e.target.value) || 0)}
              step="1"
            />
            <span style={{ fontSize: '11px', color: '#64748b' }}>Real average served by canteen</span>
          </div>

          <div className="form-group">
            <label className="form-label">Claimed Target Mean (μ₀)</label>
            <input
              type="number"
              className="form-control"
              value={claimedMean}
              onChange={(e) => setClaimedMean(parseFloat(e.target.value) || 0)}
              step="1"
            />
            <span style={{ fontSize: '11px', color: '#64748b' }}>Canteen claim (250 ml)</span>
          </div>

          <div className="form-group">
            <label className="form-label">Number of Cups (n)</label>
            <input
              type="number"
              className="form-control"
              value={sampleSize}
              onChange={(e) => setSampleSize(parseInt(e.target.value) || 5)}
              min="2"
              max="100"
            />
            <span style={{ fontSize: '11px', color: '#64748b' }}>Sample size n</span>
          </div>

          <div className="form-group">
            <label className="form-label">Serving Variation SD (ml)</label>
            <input
              type="number"
              className="form-control"
              value={variationSD}
              onChange={(e) => setVariationSD(parseFloat(e.target.value) || 1)}
              min="1"
              max="30"
            />
            <span style={{ fontSize: '11px', color: '#64748b' }}>Machine noise standard dev</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className="btn btn-purple" style={{ flex: '1' }} onClick={handleRunSimulation}>
            <Play size={16} /> Run Simulation
          </button>
        </div>

        {/* Simulation Output Display */}
        {simResult && (
          <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                Simulated Test Output (n = {simResult.values.length} cups)
              </div>
              <span className="academic-chip" style={{ background: simResult.test.isRejected ? '#ef4444' : '#22c55e' }}>
                {simResult.test.isRejected ? '🔴 H₀ REJECTED' : '🟢 FAIL TO REJECT H₀'}
              </span>
            </div>

            <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '10px' }}>
              Sample Mean: <strong style={{ color: '#60a5fa' }}>{simResult.test.sampleMean.toFixed(2)} ml</strong> |
              t-Stat: <strong style={{ color: '#fff' }}>{simResult.test.tStat.toFixed(3)}</strong> |
              p-Value: <strong style={{ color: '#fff' }}>{simResult.test.pValue.toFixed(4)}</strong>
            </div>

            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#94a3b8', background: '#0f172a', padding: '8px 12px', borderRadius: '6px', maxHeight: '70px', overflowY: 'auto' }}>
              [{simResult.values.join(', ')}]
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-primary" onClick={handleApplyToMainDashboard}>
                Load into Main Dashboard & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
