import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, ShieldAlert, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function FinalDecisionSection({ testResult }) {
  if (!testResult || !testResult.isValid) return null;

  const {
    n,
    claimedMean,
    alpha,
    sampleMean,
    tStat,
    df,
    pValue,
    criticalValue,
    isRejected,
    academicWording
  } = testResult;

  useEffect(() => {
    if (isRejected) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [isRejected]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Main Result Hero Card */}
      <div className={`card ${isRejected ? 'decision-card-rejected' : 'decision-card-supported'}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span className="academic-chip" style={{ background: isRejected ? '#ef4444' : '#22c55e' }}>
            Final Statistical Decision
          </span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: isRejected ? '#fca5a5' : '#86efac' }}>
            α = {alpha} • df = {df}
          </span>
        </div>

        <div className={`decision-hero-title ${isRejected ? 'text-danger' : 'text-success'}`}>
          {isRejected ? (
            <>
              <ShieldAlert size={36} /> 🔴 CLAIM REJECTED — H₀ REJECTED
            </>
          ) : (
            <>
              <ShieldCheck size={36} /> 🟢 CLAIM SUPPORTED — FAIL TO REJECT H₀
            </>
          )}
        </div>

        <p style={{ fontSize: '16px', fontWeight: '600', color: '#fff', margin: '14px 0', lineHeight: '1.5' }}>
          {academicWording}
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '10px 14px', borderRadius: '8px', flex: '1', minWidth: '140px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Sample Mean (x̄)</div>
            <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{sampleMean.toFixed(2)} ml</div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '10px 14px', borderRadius: '8px', flex: '1', minWidth: '140px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Claimed Mean (μ₀)</div>
            <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{claimedMean} ml</div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '10px 14px', borderRadius: '8px', flex: '1', minWidth: '140px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Calculated t</div>
            <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{tStat.toFixed(4)}</div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '10px 14px', borderRadius: '8px', flex: '1', minWidth: '140px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>p-Value</div>
            <div style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{pValue.toFixed(4)}</div>
          </div>
        </div>
      </div>

      {/* Mandatory Academic Wording Rule Box (Do NOT write "Accept H0") */}
      <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fbbf24', marginBottom: '8px' }}>
          <AlertCircle size={20} />
          <h3 style={{ fontSize: '15px', fontWeight: '700' }}>
            CRITICAL ACADEMIC TERMINOLOGY NOTICE: “Fail to Reject H₀” vs “Accept H₀”
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>
          In rigorous statistical hypothesis testing, we <strong>NEVER</strong> say <em>“Accept H₀”</em>. Instead, we use the statistically correct phrasing: <strong>“Fail to Reject H₀”</strong>.
        </p>
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: '8px', margin: '10px 0', border: '1px solid #334155', fontSize: '13px', color: '#93c5fd' }}>
          💡 <strong>Academic Rationale:</strong> Failing to reject H₀ does not mathematically prove that H₀ is true. It simply means that our sample of {n} cups does not provide strong enough statistical evidence against H₀ at α = {alpha}. Absence of evidence is not evidence of absence!
        </div>
      </div>
    </div>
  );
}
