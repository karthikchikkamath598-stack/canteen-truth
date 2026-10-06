import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';

export default function ErrorAnalysisSection({ testResult }) {
  const [selectedReality, setSelectedReality] = useState('true'); // 'true' or 'false'

  const isRejected = testResult && testResult.isValid ? testResult.isRejected : false;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <AlertTriangle size={22} style={{ color: '#f59e0b' }} /> “What Could Go Wrong?” — Type I & Type II Error Analysis
          </h2>
          <p className="card-subtitle">
            Evaluating risk, false alarms, and missed detections in canteen hypothesis testing.
          </p>
        </div>
        <span className="academic-chip">Risk Matrix</span>
      </div>

      {/* Top Cards: Type I vs Type II Definitions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: '24px' }}>
        {/* Type I Error Card */}
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#f87171', textTransform: 'uppercase' }}>
              Type I Error (α)
            </span>
            <span className="academic-chip" style={{ background: '#ef4444' }}>False Alarm</span>
          </div>

          <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: '10px 0' }}>
            Reject H₀ when H₀ is ACTUALLY TRUE
          </div>

          <p style={{ fontSize: '13px', color: '#fca5a5', lineHeight: '1.5' }}>
            <strong>Real-World Canteen Interpretation:</strong> The canteen actually serves an honest average of 250 ml, but due to random sampling variation, our test mistakenly concludes that the average is different and unfairly accuses the canteen!
          </p>

          <div style={{ marginTop: '12px', fontSize: '12px', color: '#94a3b8', background: 'rgba(0, 0, 0, 0.2)', padding: '8px 12px', borderRadius: '6px' }}>
            Maximum Probability of Type I Error = <strong>Significance Level (α = {testResult?.alpha || 0.05})</strong>
          </div>
        </div>

        {/* Type II Error Card */}
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#fbbf24', textTransform: 'uppercase' }}>
              Type II Error (β)
            </span>
            <span className="academic-chip" style={{ background: '#f59e0b' }}>Missed Detection</span>
          </div>

          <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: '10px 0' }}>
            Fail to Reject H₀ when H₀ is ACTUALLY FALSE
          </div>

          <p style={{ fontSize: '13px', color: '#fde68a', lineHeight: '1.5' }}>
            <strong>Real-World Canteen Interpretation:</strong> The canteen is actually cheating students (e.g. serving only 240 ml), but our sample size was too small or noisy, so the test failed to detect the shortage!
          </p>

          <div style={{ marginTop: '12px', fontSize: '12px', color: '#94a3b8', background: 'rgba(0, 0, 0, 0.2)', padding: '8px 12px', borderRadius: '6px' }}>
            Statistical Power = <strong>1 - β</strong> (Ability of test to correctly catch false claims).
          </div>
        </div>
      </div>

      {/* 2x2 Decision Matrix Section */}
      <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>
              Standard 2 × 2 Statistical Decision Matrix
            </h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              See how our test decision maps against hypothetical canteen reality.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Simulate Ground Reality:</span>
            <button
              className={`btn btn-sm ${selectedReality === 'true' ? 'btn-primary' : ''}`}
              onClick={() => setSelectedReality('true')}
            >
              H₀ is True (Canteen = 250ml)
            </button>
            <button
              className={`btn btn-sm ${selectedReality === 'false' ? 'btn-purple' : ''}`}
              onClick={() => setSelectedReality('false')}
            >
              H₀ is False (Canteen ≠ 250ml)
            </button>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="error-matrix">
          <div className="matrix-header">
            Reality vs Decision
          </div>
          <div className="matrix-header">
            Our Decision: Reject H₀<br />(Claim Challenged)
          </div>
          <div className="matrix-header">
            Our Decision: Fail to Reject H₀<br />(Claim Maintained)
          </div>

          {/* Row 1: H0 is True */}
          <div className="matrix-header" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <strong style={{ color: '#fff' }}>H₀ is TRUE</strong>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>Actual Avg = 250 ml</span>
          </div>

          {/* Cell 1,1: Reject H0 when H0 True -> Type I Error */}
          <div className={`matrix-cell ${isRejected && selectedReality === 'true' ? 'active-outcome' : ''}`}
            style={{ borderLeft: '4px solid #ef4444' }}>
            <div className="matrix-cell-title" style={{ color: '#f87171' }}>
              🔴 TYPE I ERROR
            </div>
            <div className="matrix-cell-desc">
              False Alarm! We rejected a true canteen claim. (Probability = α = {testResult?.alpha || 0.05})
            </div>
            {isRejected && selectedReality === 'true' && (
              <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: '700', color: '#f87171' }}>
                👉 CURRENT SIMULATED OUTCOME
              </div>
            )}
          </div>

          {/* Cell 1,2: Fail to Reject H0 when H0 True -> Correct Decision */}
          <div className={`matrix-cell ${!isRejected && selectedReality === 'true' ? 'active-outcome' : ''}`}
            style={{ borderLeft: '4px solid #22c55e' }}>
            <div className="matrix-cell-title" style={{ color: '#4ade80' }}>
              🟢 CORRECT DECISION
            </div>
            <div className="matrix-cell-desc">
              Proper Support! Maintained H₀ when canteen was indeed honest. (Probability = 1 - α)
            </div>
            {!isRejected && selectedReality === 'true' && (
              <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: '700', color: '#4ade80' }}>
                👉 CURRENT SIMULATED OUTCOME
              </div>
            )}
          </div>

          {/* Row 2: H0 is False */}
          <div className="matrix-header" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <strong style={{ color: '#fff' }}>H₀ is FALSE</strong>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>Actual Avg ≠ 250 ml</span>
          </div>

          {/* Cell 2,1: Reject H0 when H0 False -> Correct Decision */}
          <div className={`matrix-cell ${isRejected && selectedReality === 'false' ? 'active-outcome' : ''}`}
            style={{ borderLeft: '4px solid #22c55e' }}>
            <div className="matrix-cell-title" style={{ color: '#4ade80' }}>
              🟢 CORRECT DECISION
            </div>
            <div className="matrix-cell-desc">
              Successful Catch! Rejected H₀ when canteen was indeed cheating. (Power = 1 - β)
            </div>
            {isRejected && selectedReality === 'false' && (
              <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: '700', color: '#4ade80' }}>
                👉 CURRENT SIMULATED OUTCOME
              </div>
            )}
          </div>

          {/* Cell 2,2: Fail to Reject H0 when H0 False -> Type II Error */}
          <div className={`matrix-cell ${!isRejected && selectedReality === 'false' ? 'active-outcome' : ''}`}
            style={{ borderLeft: '4px solid #f59e0b' }}>
            <div className="matrix-cell-title" style={{ color: '#fbbf24' }}>
              🟡 TYPE II ERROR
            </div>
            <div className="matrix-cell-desc">
              Missed Detection! Failed to catch an dishonest serving. (Probability = β)
            </div>
            {!isRejected && selectedReality === 'false' && (
              <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: '700', color: '#fbbf24' }}>
                👉 CURRENT SIMULATED OUTCOME
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
