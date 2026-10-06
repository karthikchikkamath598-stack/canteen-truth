import React from 'react';
import { PRESET_DATASETS } from '../utils/stats';
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export default function HomeSection({ onSelectPreset, onNavigateToInput }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <span>🥤</span> Real-World Academic Scenario
          </h2>
          <p className="card-subtitle">
            Module VII: Testing of Hypothesis – I • One-Sample Mean Test
          </p>
        </div>
        <span className="academic-chip">Academic Case Study</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '16px 0' }}>
        {/* Canteen Claim Box */}
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Official Canteen Claim (Null Hypothesis H₀)
          </div>
          <blockquote style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc', fontStyle: 'italic', borderLeft: '4px solid #3b82f6', paddingLeft: '12px', margin: '10px 0' }}>
            “Every cup of juice served at our college canteen contains an average volume of 250 ml.”
          </blockquote>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '10px' }}>
            Population Mean Target: <strong style={{ color: '#fff' }}>μ₀ = 250 ml</strong>
          </p>
        </div>

        {/* Student Suspicion Box */}
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Student Suspicion (Alternative Hypothesis H₁)
          </div>
          <p style={{ fontSize: '15px', color: '#e2e8f0', fontWeight: '500', margin: '10px 0' }}>
            Students suspect that the actual average volume served per cup is <strong>different from 250 ml</strong> (either short-filled or inconsistent).
          </p>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '10px' }}>
            Hypothesis to Test: <strong style={{ color: '#fff' }}>H₁: μ ≠ 250 ml (Two-tailed test)</strong>
          </p>
        </div>
      </div>

      {/* Visual Workflow Pipeline */}
      <div style={{ margin: '24px 0', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>
          Statistical Testing Workflow
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ textAlign: 'center', flex: '1', minWidth: '120px', background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '20px' }}>📢</div>
            <div style={{ fontSize: '12px', fontWeight: '700', marginTop: '4px' }}>1. Canteen Claim</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>μ₀ = 250 ml</div>
          </div>

          <ArrowRight size={18} style={{ color: '#64748b' }} />

          <div style={{ textAlign: 'center', flex: '1', minWidth: '120px', background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '20px' }}>🧪</div>
            <div style={{ fontSize: '12px', fontWeight: '700', marginTop: '4px' }}>2. Sample Cups</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Measure n cups</div>
          </div>

          <ArrowRight size={18} style={{ color: '#64748b' }} />

          <div style={{ textAlign: 'center', flex: '1', minWidth: '120px', background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '20px' }}>🧮</div>
            <div style={{ fontSize: '12px', fontWeight: '700', marginTop: '4px' }}>3. Calculate t & p</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>x̄, s, SE, t, p-val</div>
          </div>

          <ArrowRight size={18} style={{ color: '#64748b' }} />

          <div style={{ textAlign: 'center', flex: '1', minWidth: '120px', background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '20px' }}>⚖️</div>
            <div style={{ fontSize: '12px', fontWeight: '700', marginTop: '4px' }}>4. Hypothesis Test</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Compare p vs α</div>
          </div>

          <ArrowRight size={18} style={{ color: '#64748b' }} />

          <div style={{ textAlign: 'center', flex: '1', minWidth: '120px', background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #3b82f6' }}>
            <div style={{ fontSize: '20px' }}>🎯</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#60a5fa', marginTop: '4px' }}>5. Final Decision</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Reject / Fail to Reject</div>
          </div>
        </div>
      </div>

      {/* Preset Dataset Loaders */}
      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} style={{ color: '#fbbf24' }} /> Quick Start with Sample Presets
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {PRESET_DATASETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                onNavigateToInput();
              }}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="preset-card-hover"
            >
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#60a5fa', marginBottom: '4px' }}>
                {preset.name}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                {preset.description}
              </div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                [{preset.values.slice(0, 5).join(', ')}...] (n={preset.values.length})
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={onNavigateToInput}>
          Proceed to Sample Data Entry <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
