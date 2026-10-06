import React from 'react';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CalculationBreakdownSection({ testResult }) {
  if (!testResult || !testResult.isValid) return null;

  const {
    n,
    claimedMean,
    alpha,
    sampleMean,
    sampleSD,
    standardError,
    tStat,
    df,
    pValue,
    criticalValue,
    isRejected,
    data
  } = testResult;

  const sumValues = data.reduce((a, b) => a + b, 0);

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Layers size={22} style={{ color: '#8b5cf6' }} /> Live Step-by-Step Calculation Breakdown
          </h2>
          <p className="card-subtitle">
            Detailed mathematical substitutions for presentation defense.
          </p>
        </div>
        <span className="academic-chip">Academic Proof</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Step A: Mean calculation */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#60a5fa' }}>
            Step 1: Calculate Sample Mean (x̄)
          </div>
          <div className="formula-block">
            x̄ = (Σx) / n = ({sumValues.toFixed(1)}) / {n} = {sampleMean.toFixed(4)} ml
          </div>
        </div>

        {/* Step B: Standard Deviation & SE */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc' }}>
            Step 2: Calculate Standard Deviation (s) & Standard Error (SE)
          </div>
          <div className="formula-block">
            s = √[ Σ(x_i - x̄)² / (n - 1) ] = {sampleSD.toFixed(4)} ml
          </div>
          <div className="formula-block">
            SE = s / √n = {sampleSD.toFixed(4)} / √{n} = {sampleSD.toFixed(4)} / {Math.sqrt(n).toFixed(4)} = {standardError.toFixed(4)} ml
          </div>
        </div>

        {/* Step C: t-Statistic substitution */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#34d399' }}>
            Step 3: Calculate Test Statistic (t) & Degrees of Freedom (df)
          </div>
          <div className="formula-block">
            df = n - 1 = {n} - 1 = {df}
          </div>
          <div className="formula-block">
            t = (x̄ - μ₀) / SE = ({sampleMean.toFixed(4)} - {claimedMean}) / {standardError.toFixed(4)} = {(sampleMean - claimedMean).toFixed(4)} / {standardError.toFixed(4)} = {tStat.toFixed(4)}
          </div>
        </div>

        {/* Step D: p-value and critical value comparison */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#fbbf24' }}>
            Step 4: Evaluate Two-Tailed p-Value & Compare with α = {alpha}
          </div>
          <div className="formula-block">
            p-value = P(|T(df = {df})| &gt; |{tStat.toFixed(4)}|) = {pValue.toFixed(4)}
          </div>
          <div style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '10px' }}>
            Comparing p-value ({pValue.toFixed(4)}) with α ({alpha}):
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '800',
            fontFamily: 'var(--font-mono)',
            padding: '10px 14px',
            borderRadius: '6px',
            margin: '8px 0',
            background: isRejected ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
            color: isRejected ? '#f87171' : '#4ade80',
            border: `1px solid ${isRejected ? '#ef4444' : '#22c55e'}`
          }}>
            {pValue.toFixed(4)} {pValue < alpha ? '<' : '≥'} {alpha} → {isRejected ? 'REJECT H₀' : 'FAIL TO REJECT H₀'}
          </div>
        </div>
      </div>
    </div>
  );
}
