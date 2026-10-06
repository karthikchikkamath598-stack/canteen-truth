import React from 'react';
import { Award, X, ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function PresentationModeModal({ isOpen, onClose, testResult, aboutInfo }) {
  if (!isOpen || !testResult || !testResult.isValid) return null;

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
    academicWording,
    data
  } = testResult;

  const collegeName = aboutInfo?.collegeName || 'College of Engineering & Science';

  return (
    <div className="modal-overlay" style={{ zIndex: 200, padding: 0 }}>
      <div className="presentation-container" style={{ width: '100vw', height: '100vh', overflowY: 'auto' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#60a5fa', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {collegeName} • Academic Presentation Defense
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', margin: '4px 0' }}>
              🥤 Canteen Truth Detector
            </h1>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>
              Module VII — Testing of Hypothesis – I (One-Sample t-Test)
            </div>
          </div>
          <button className="btn btn-sm" onClick={onClose} style={{ background: '#334155', color: '#fff' }}>
            <X size={20} /> Exit Presentation Mode
          </button>
        </div>

        {/* 12 Core Slides / Grid Cards */}
        <div className="presentation-grid" style={{ margin: '30px 0' }}>
          {/* Card 1: Problem & Canteen Claim */}
          <div style={{ background: '#1e293b', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#60a5fa', textTransform: 'uppercase' }}>1 & 2. Research Problem & Claim</div>
            <blockquote style={{ fontSize: '20px', fontWeight: '800', fontStyle: 'italic', color: '#fff', margin: '14px 0', borderLeft: '4px solid #3b82f6', paddingLeft: '12px' }}>
              “One cup of juice contains an average of {claimedMean} ml.”
            </blockquote>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>
              Students suspect the actual average volume served per cup differs from {claimedMean} ml.
            </p>
          </div>

          {/* Card 2: Sample Data */}
          <div style={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>3. Empirical Sample Data (n = {n})</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '14px 0', fontFamily: 'var(--font-mono)' }}>
              [{data.join(', ')}]
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
              Measured across {n} randomly sampled juice cups.
            </div>
          </div>

          {/* Card 3: Hypotheses & Alpha */}
          <div style={{ background: '#1e293b', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', textTransform: 'uppercase' }}>4, 5 & 6. Hypotheses Formulation & Significance</div>
            <div style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#fff', margin: '10px 0' }}>
              H₀: μ = {claimedMean} ml
            </div>
            <div style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#c084fc', margin: '10px 0' }}>
              H₁: μ ≠ {claimedMean} ml (Two-tailed)
            </div>
            <div style={{ fontSize: '14px', color: '#cbd5e1' }}>
              Significance Level: <strong>α = {alpha}</strong>
            </div>
          </div>

          {/* Card 4: Key Test Metrics */}
          <div style={{ background: '#1e293b', border: '1px solid #10b981', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#34d399', textTransform: 'uppercase' }}>7, 8, 9 & 10. Statistical Calculations</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Sample Mean (x̄)</span>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>{sampleMean.toFixed(2)} ml</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>t-Statistic (t)</span>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>{tStat.toFixed(4)}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Critical Value (t_crit)</span>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>±{criticalValue.toFixed(4)}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Two-Tailed p-Value</span>
                <div style={{ fontSize: '20px', fontWeight: '800', color: pValue < alpha ? '#f87171' : '#4ade80' }}>{pValue.toFixed(4)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Decision Hero Banner */}
        <div style={{
          background: isRejected ? 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)' : 'linear-gradient(135deg, #14532d 0%, #166534 100%)',
          border: `3px solid ${isRejected ? '#ef4444' : '#22c55e'}`,
          borderRadius: '16px',
          padding: '30px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: isRejected ? '#fca5a5' : '#86efac', textTransform: 'uppercase', letterSpacing: '1px' }}>
            11 & 12. Final Statistical Decision & Conclusion
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', margin: '10px 0' }}>
            {isRejected ? '🔴 CLAIM REJECTED (H₀ Rejected)' : '🟢 CLAIM SUPPORTED (Fail to Reject H₀)'}
          </h2>
          <p style={{ fontSize: '18px', color: '#f8fafc', fontWeight: '600', maxWidth: '900px', margin: '0 auto' }}>
            {academicWording}
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #334155', paddingTop: '20px', marginTop: '30px', color: '#64748b', fontSize: '13px' }}>
          <div>Module VII: Testing of Hypothesis – I • One-Sample t-Test</div>
          <div>Press 'Exit Presentation Mode' to return to interactive dashboard</div>
        </div>
      </div>
    </div>
  );
}
