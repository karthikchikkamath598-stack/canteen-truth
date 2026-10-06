import React from 'react';
import { GitCommit, ShieldCheck, ShieldAlert, Info } from 'lucide-react';

export default function HypothesisSetupSection({ claimedMean, isRejected }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <GitCommit size={22} style={{ color: '#3b82f6' }} /> Hypothesis Setup
          </h2>
          <p className="card-subtitle">
            Formal statistical formulation of Null (H₀) and Alternative (H₁) hypotheses.
          </p>
        </div>
        <span className="academic-chip">Two-Tailed t-Test</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '16px 0' }}>
        {/* Null Hypothesis Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          border: '2px solid #3b82f6',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Null Hypothesis
            </span>
            <span style={{ background: '#1e3a8a', color: '#93c5fd', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
              Default Assumption
            </span>
          </div>

          <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#fff', margin: '12px 0' }}>
            H₀: μ = {claimedMean} ml
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0', fontSize: '14px', fontWeight: '600' }}>
            <ShieldCheck size={18} style={{ color: '#4ade80' }} />
            <span>Canteen's claim is maintained (No significant difference).</span>
          </div>
        </div>

        {/* Alternative Hypothesis Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          border: '2px solid #8b5cf6',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Alternative Hypothesis
            </span>
            <span style={{ background: '#4c1d95', color: '#e9d5ff', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
              Research Challenge
            </span>
          </div>

          <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#fff', margin: '12px 0' }}>
            H₁: μ ≠ {claimedMean} ml
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0', fontSize: '14px', fontWeight: '600' }}>
            <ShieldAlert size={18} style={{ color: '#f87171' }} />
            <span>Canteen's claim is challenged (Statistically significant difference).</span>
          </div>
        </div>
      </div>

      {/* Rationale Explanation Box */}
      <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Info size={16} /> Why use a Two-Tailed Test?
        </h3>
        <p style={{ fontSize: '13px', color: '#cbd5e1' }}>
          We use a <strong>two-tailed test</strong> because students want to detect whether the average juice volume is different from 250 ml in <strong>either direction</strong> (whether short-filled below 250 ml or over-filled above 250 ml). The rejection region is split equally between the lower and upper tails (α/2 in each tail).
        </p>

        <p style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '10px' }}>
          💡 <strong>Academic Assumption:</strong> We begin by assuming that H₀ (the canteen's claim of 250 ml) is true. We only reject H₀ if our sample measurements provide overwhelmingly strong evidence against it.
        </p>
      </div>
    </div>
  );
}
