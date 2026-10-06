import React from 'react';
import { Calculator, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function StatisticalCalculationsSection({ testResult }) {
  if (!testResult.isValid) {
    return (
      <div className="card">
        <h2 className="card-title">📐 Statistical Calculations</h2>
        <p style={{ color: 'var(--danger-text)', marginTop: '10px' }}>
          {testResult.errorMsg}
        </p>
      </div>
    );
  }

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
    isRejected
  } = testResult;

  const absoluteT = Math.abs(tStat);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Calculator size={22} style={{ color: '#3b82f6' }} /> Statistical Calculations & Test Metrics
          </h2>
          <p className="card-subtitle">
            One-Sample t-Test • Calculated dynamically in browser using Student's t-distribution.
          </p>
        </div>
        <span className="academic-chip">df = {df}</span>
      </div>

      {/* Grid of Key Statistics */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-box">
          <div className="stat-box-label">
            <span>Sample Size (n)</span>
            <span>Count</span>
          </div>
          <div className="stat-box-value">{n}</div>
          <div className="stat-box-subtext">Number of juice cups sampled</div>
        </div>

        <div className="stat-box">
          <div className="stat-box-label">
            <span>Sample Mean (x̄)</span>
            <span>x̄ = Σx / n</span>
          </div>
          <div className="stat-box-value">{sampleMean.toFixed(2)} ml</div>
          <div className="stat-box-subtext">
            Difference: {(sampleMean - claimedMean > 0 ? '+' : '')}{(sampleMean - claimedMean).toFixed(2)} ml
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-box-label">
            <span>Sample Std Dev (s)</span>
            <span>Variation</span>
          </div>
          <div className="stat-box-value">{sampleSD.toFixed(2)} ml</div>
          <div className="stat-box-subtext">s = √[Σ(x - x̄)² / (n - 1)]</div>
        </div>

        <div className="stat-box">
          <div className="stat-box-label">
            <span>Standard Error (SE)</span>
            <span>SE = s / √n</span>
          </div>
          <div className="stat-box-value">{standardError.toFixed(3)} ml</div>
          <div className="stat-box-subtext">Sampling distribution variance</div>
        </div>
      </div>

      {/* Test Statistic & Critical Parameters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* t-Statistic Card */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #3b82f6', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#60a5fa', textTransform: 'uppercase' }}>
            Calculated t-Statistic (t)
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#fff', margin: '6px 0' }}>
            t = {tStat.toFixed(4)}
          </div>
          <div className="formula-block" style={{ margin: '8px 0', padding: '8px 12px', fontSize: '12px' }}>
            t = (x̄ - μ₀) / SE = ({sampleMean.toFixed(2)} - {claimedMean}) / {standardError.toFixed(3)}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
            Measures how many standard errors sample mean is away from claimed mean.
          </div>
        </div>

        {/* Degrees of Freedom & Critical t */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #8b5cf6', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#c084fc', textTransform: 'uppercase' }}>
            Critical t-Value (t_crit)
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#fff', margin: '6px 0' }}>
            ±{criticalValue.toFixed(4)}
          </div>
          <div style={{ fontSize: '12px', color: '#cbd5e1', margin: '6px 0' }}>
            Significance Level: <strong>α = {alpha}</strong> • Degrees of Freedom: <strong>df = {df}</strong>
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
            Threshold boundary beyond which H₀ is rejected.
          </div>
        </div>

        {/* p-Value Card */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #10b981', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#34d399', textTransform: 'uppercase' }}>
            Two-Tailed p-Value
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: pValue < alpha ? '#f87171' : '#4ade80', margin: '6px 0' }}>
            p = {pValue < 0.0001 ? '< 0.0001' : pValue.toFixed(4)}
          </div>
          <div style={{ fontSize: '12px', color: '#cbd5e1', margin: '6px 0' }}>
            Comparison with α: <strong>{pValue.toFixed(4)} {pValue < alpha ? '<' : '≥'} {alpha}</strong>
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
            ⓘ Smaller p-values provide stronger evidence against H₀.
          </div>
        </div>
      </div>

      {/* Side-by-Side Dual Decision Criteria Verification */}
      <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '14px' }}>
          Dual Statistical Decision Method Comparison
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Method 1: Critical Value Method */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#60a5fa' }}>
              Method 1 — Critical Value Test
            </div>
            <div style={{ fontSize: '12px', color: '#cbd5e1', margin: '8px 0' }}>
              Rule: If <strong>|t| &gt; t_crit</strong> → Reject H₀, else Fail to Reject H₀
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '700', color: '#fff', background: '#0f172a', padding: '8px', borderRadius: '6px', margin: '8px 0' }}>
              |{tStat.toFixed(4)}| = {absoluteT.toFixed(4)} {absoluteT > criticalValue ? '>' : '≤'} {criticalValue.toFixed(4)}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: isRejected ? '#f87171' : '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {isRejected ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
              {isRejected ? 'Decision: Reject H₀' : 'Decision: Fail to Reject H₀'}
            </div>
          </div>

          {/* Method 2: p-Value Method */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#34d399' }}>
              Method 2 — p-Value Comparison Test
            </div>
            <div style={{ fontSize: '12px', color: '#cbd5e1', margin: '8px 0' }}>
              Rule: If <strong>p-value &lt; α</strong> → Reject H₀, else Fail to Reject H₀
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '700', color: '#fff', background: '#0f172a', padding: '8px', borderRadius: '6px', margin: '8px 0' }}>
              {pValue.toFixed(4)} {pValue < alpha ? '<' : '≥'} {alpha}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: isRejected ? '#f87171' : '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {isRejected ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
              {isRejected ? 'Decision: Reject H₀' : 'Decision: Fail to Reject H₀'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
