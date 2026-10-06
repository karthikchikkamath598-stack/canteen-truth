import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Sparkles, AlertCircle, HelpCircle, Check } from 'lucide-react';
import { PRESET_DATASETS, generateSimulatedData } from '../utils/stats';

export default function DataInputSection({
  claimedMean,
  setClaimedMean,
  alpha,
  setAlpha,
  sampleList,
  setSampleList,
  rawInputString,
  setRawInputString,
  inputMode,
  setInputMode,
  onReset,
  validationResult
}) {
  // Update table from string
  const handleStringChange = (e) => {
    const val = e.target.value;
    setRawInputString(val);
    const parsed = val
      .split(/[\s,]+/)
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v));
    setSampleList(parsed);
  };

  // Add individual sample row
  const handleAddSample = () => {
    const lastVal = sampleList.length > 0 ? sampleList[sampleList.length - 1] : 250;
    const newList = [...sampleList, lastVal];
    setSampleList(newList);
    setRawInputString(newList.join(', '));
  };

  // Update individual row value
  const handleUpdateRow = (index, val) => {
    const num = parseFloat(val);
    const newList = [...sampleList];
    newList[index] = isNaN(num) ? 0 : num;
    setSampleList(newList);
    setRawInputString(newList.join(', '));
  };

  // Remove row
  const handleRemoveRow = (index) => {
    if (sampleList.length <= 1) return;
    const newList = sampleList.filter((_, i) => i !== index);
    setSampleList(newList);
    setRawInputString(newList.join(', '));
  };

  // Load standard preset
  const handleLoadExample = () => {
    const defaultPreset = PRESET_DATASETS[0];
    setClaimedMean(defaultPreset.claimedMean);
    setAlpha(defaultPreset.alpha);
    setSampleList(defaultPreset.values);
    setRawInputString(defaultPreset.values.join(', '));
  };

  // Generate random data
  const handleGenerateRandom = () => {
    const randomData = generateSimulatedData(claimedMean, 12, 5);
    setSampleList(randomData);
    setRawInputString(randomData.join(', '));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <span>📝</span> Data Input & Parameters
          </h2>
          <p className="card-subtitle">
            Set claimed population mean, significance level α, and sample cup observations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-sm" onClick={handleLoadExample} title="Load Default 10 Cup Sample Data">
            <Sparkles size={14} /> Load Example Data
          </button>
          <button className="btn btn-sm" onClick={handleGenerateRandom} title="Generate Simulated Random Sample">
            <Sparkles size={14} /> Randomize Sample
          </button>
          <button className="btn btn-sm" onClick={onReset} title="Reset to Defaults">
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        {/* Claimed Mean Input */}
        <div className="form-group">
          <label className="form-label">
            Population / Claimed Mean (μ₀)
            <span className="info-tooltip" title="The volume in ml claimed by the canteen to be served per cup on average.">ⓘ</span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="number"
              className="form-control"
              value={claimedMean}
              onChange={(e) => setClaimedMean(parseFloat(e.target.value) || 0)}
              step="1"
              min="1"
            />
            <span style={{ fontWeight: '700', color: '#94a3b8', fontSize: '14px' }}>ml</span>
          </div>
        </div>

        {/* Significance Level (Alpha) */}
        <div className="form-group">
          <label className="form-label">
            Significance Level (α)
            <span className="info-tooltip" title="α represents the probability of making a Type I error (false alarm) that we are willing to accept.">ⓘ</span>
          </label>
          <select
            className="form-control"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
          >
            <option value={0.10}>α = 0.10 (10% Significance Level / 90% Confidence)</option>
            <option value={0.05}>α = 0.05 (5% Significance Level / 95% Confidence — Default)</option>
            <option value={0.01}>α = 0.01 (1% Significance Level / 99% Confidence — Strict)</option>
          </select>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
            ⓘ α represents the probability of making a Type I error that we are willing to accept.
          </div>
        </div>
      </div>

      {/* Input Mode Toggle */}
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#e2e8f0' }}>Sample Input Mode:</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn btn-sm ${inputMode === 'string' ? 'btn-primary' : ''}`}
            onClick={() => setInputMode('string')}
          >
            Comma Separated List
          </button>
          <button
            className={`btn btn-sm ${inputMode === 'table' ? 'btn-primary' : ''}`}
            onClick={() => setInputMode('table')}
          >
            Observation Table (+Add Row)
          </button>
        </div>
      </div>

      {/* Input Mode 1: Comma Separated */}
      {inputMode === 'string' ? (
        <div className="form-group">
          <label className="form-label">
            Enter Measured Quantities (in ml, comma or space separated)
          </label>
          <textarea
            className="form-control"
            value={rawInputString}
            onChange={handleStringChange}
            placeholder="e.g. 245, 252, 248, 241, 255, 249, 247, 251, 244, 250"
            rows={3}
          />
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
            Current Sample Size: <strong style={{ color: '#60a5fa' }}>n = {sampleList.length}</strong> cups
          </div>
        </div>
      ) : (
        /* Input Mode 2: Interactive Table */
        <div>
          <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
            <table className="sample-table">
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Sample #</th>
                  <th>Measured Quantity (ml)</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleList.map((val, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: '600', color: '#94a3b8' }}>Cup {idx + 1}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        style={{ padding: '6px 10px', fontSize: '13px' }}
                        value={val}
                        onChange={(e) => handleUpdateRow(idx, e.target.value)}
                        step="0.1"
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn btn-sm"
                        style={{ color: '#f87171', border: 'none', background: 'transparent' }}
                        onClick={() => handleRemoveRow(idx)}
                        disabled={sampleList.length <= 1}
                        title="Remove observation"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
            <button className="btn btn-sm btn-primary" onClick={handleAddSample}>
              <Plus size={14} /> + Add Sample Cup
            </button>
          </div>
        </div>
      )}

      {/* Validation Banner */}
      {!validationResult.isValid ? (
        <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: '8px', padding: '12px 16px', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--danger-text)' }}>
          <AlertCircle size={20} />
          <div>
            <div style={{ fontWeight: '700' }}>Validation Error</div>
            <div style={{ fontSize: '13px' }}>{validationResult.errorMsg}</div>
          </div>
        </div>
      ) : sampleList.length < 5 ? (
        <div style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-border)', borderRadius: '8px', padding: '10px 14px', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--warning-text)', fontSize: '13px' }}>
          <AlertCircle size={18} />
          <div>
            <strong>Small Sample Notice:</strong> You have entered {sampleList.length} observations. Small samples (n &lt; 5) increase standard error and may have low statistical power.
          </div>
        </div>
      ) : null}
    </div>
  );
}
