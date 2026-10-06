import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowWeDecidedTimeline({ testResult }) {
  if (!testResult || !testResult.isValid) return null;

  const {
    n,
    claimedMean,
    alpha,
    sampleMean,
    tStat,
    pValue,
    criticalValue,
    isRejected
  } = testResult;

  const steps = [
    {
      num: 1,
      title: 'Collect Sample Measurements',
      desc: `Gathered ${n} physical juice cup measurements from canteen servings.`
    },
    {
      num: 2,
      title: 'Calculate Sample Mean (x̄)',
      desc: `Averaged measured cup quantities to obtain x̄ = ${sampleMean.toFixed(2)} ml.`
    },
    {
      num: 3,
      title: 'Formulate Hypotheses (H₀ & H₁)',
      desc: `Set H₀: μ = ${claimedMean} ml (Canteen claim) vs H₁: μ ≠ ${claimedMean} ml (Two-tailed challenge).`
    },
    {
      num: 4,
      title: 'Choose Significance Level (α)',
      desc: `Selected α = ${alpha} (willing to accept a ${(alpha * 100).toFixed(0)}% chance of Type I error).`
    },
    {
      num: 5,
      title: 'Calculate Test Statistic (t)',
      desc: `Evaluated t = (x̄ - μ₀) / SE = ${tStat.toFixed(4)}.`
    },
    {
      num: 6,
      title: 'Calculate Two-Tailed p-Value',
      desc: `Derived p-value = ${pValue.toFixed(4)} from Student's t-distribution with df = ${n - 1}.`
    },
    {
      num: 7,
      title: 'Compare p-Value with α',
      desc: `Evaluated ${pValue.toFixed(4)} vs ${alpha} (${pValue < alpha ? 'p < α' : 'p ≥ α'}).`
    },
    {
      num: 8,
      title: 'Make Final Statistical Decision',
      desc: isRejected
        ? 'Since p < α, we REJECT H₀ and conclude the average volume differs significantly from 250 ml.'
        : 'Since p ≥ α, we FAIL TO REJECT H₀ because there is insufficient sample evidence against 250 ml.'
    }
  ];

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <span>🗺️</span> How Did We Decide? — Step-by-Step Process Timeline
          </h2>
          <p className="card-subtitle">
            8-step systematic statistical decision framework.
          </p>
        </div>
      </div>

      <div className="timeline-list">
        {steps.map((step) => (
          <div key={step.num} className="timeline-item">
            <div className="timeline-dot">{step.num}</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#60a5fa' }}>
              Step {step.num}: {step.title}
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px' }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
