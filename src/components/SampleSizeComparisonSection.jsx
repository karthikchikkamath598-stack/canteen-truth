import React, { useState } from 'react';
import { generateSimulatedData, calculateOneSampleTTest } from '../utils/stats';
import { BarChart2, Info, RefreshCw } from 'lucide-react';

export default function SampleSizeComparisonSection() {
  const [trueMean, setTrueMean] = useState(244); // 6ml shortage
  const [variationSD, setVariationSD] = useState(7);
  const [claimedMean, setClaimedMean] = useState(250);
  const [alpha, setAlpha] = useState(0.05);

  const sampleSizes = [5, 10, 20, 50];

  const [comparisonResults, setComparisonResults] = useState(() => {
    return sampleSizes.map((n) => {
      const data = generateSimulatedData(244, n, 7);
      return {
        n,
        test: calculateOneSampleTTest(data, 250, 0.05)
      };
    });
  });

  const handleReRunExperiment = () => {
    const newResults = sampleSizes.map((n) => {
      const data = generateSimulatedData(trueMean, n, variationSD);
      return {
        n,
        test: calculateOneSampleTTest(data, claimedMean, alpha)
      };
    });
    setComparisonResults(newResults);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <BarChart2 size={22} style={{ color: '#8b5cf6' }} /> “Does More Data Make a Difference?” — Sample Size (n) Comparison
          </h2>
          <p className="card-subtitle">
            Demonstrating how sample size affects Standard Error (SE), t-statistic magnitude, p-values, and statistical decision power.
          </p>
        </div>
        <button className="btn btn-sm btn-purple" onClick={handleReRunExperiment}>
          <RefreshCw size={14} /> Re-run Experiment
        </button>
      </div>

      {/* Control sliders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
        <div>
          <label className="form-label" style={{ fontSize: '12px' }}>Simulated True Serving (ml)</label>
          <input
            type="number"
            className="form-control"
            value={trueMean}
            onChange={(e) => setTrueMean(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <label className="form-label" style={{ fontSize: '12px' }}>Machine Standard Dev (ml)</label>
          <input
            type="number"
            className="form-control"
            value={variationSD}
            onChange={(e) => setVariationSD(parseFloat(e.target.value) || 1)}
          />
        </div>
        <div>
          <label className="form-label" style={{ fontSize: '12px' }}>Claimed Target Mean (ml)</label>
          <input
            type="number"
            className="form-control"
            value={claimedMean}
            onChange={(e) => setClaimedMean(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Side-by-Side Cards Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {comparisonResults.map((item) => {
          const { n, test } = item;
          if (!test.isValid) return null;

          return (
            <div
              key={n}
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: `2px solid ${test.isRejected ? '#ef4444' : '#334155'}`,
                borderRadius: '10px',
                padding: '16px',
                boxShadow: test.isRejected ? '0 0 15px rgba(239, 68, 68, 0.2)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>n = {n} cups</span>
                <span className="academic-chip" style={{ background: test.isRejected ? '#ef4444' : '#3b82f6', fontSize: '10px' }}>
                  {test.isRejected ? 'REJECT H₀' : 'FAIL TO REJECT'}
                </span>
              </div>

              <div style={{ margin: '12px 0', fontSize: '13px', color: '#cbd5e1' }}>
                <div>Sample Mean x̄: <strong style={{ color: '#60a5fa' }}>{test.sampleMean.toFixed(2)} ml</strong></div>
                <div>Standard Error SE: <strong style={{ color: '#c084fc' }}>{test.standardError.toFixed(3)} ml</strong></div>
                <div>t-Statistic: <strong style={{ color: '#fff' }}>{test.tStat.toFixed(3)}</strong></div>
                <div>p-Value: <strong style={{ color: test.pValue < alpha ? '#f87171' : '#4ade80' }}>{test.pValue.toFixed(4)}</strong></div>
                <div>Critical Value: <strong>±{test.criticalValue.toFixed(3)}</strong></div>
              </div>

              <div style={{ fontSize: '11px', color: '#94a3b8', borderTop: '1px solid #334155', paddingTop: '8px', marginTop: '8px' }}>
                {n <= 10
                  ? '⚠️ High SE means low statistical sensitivity.'
                  : '✅ Small SE allows precise detection of true differences.'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Explanation */}
      <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '14px', marginTop: '20px', fontSize: '13px', color: '#93c5fd' }}>
        💡 <strong>Key Statistical Takeaway:</strong> As sample size n increases, the Standard Error ($SE = s / \sqrt{n}$) decreases. Smaller standard error reduces random sampling uncertainty, which increases the t-statistic magnitude and lowers the p-value — giving the test higher statistical power to detect small real-world shortages!
      </div>
    </div>
  );
}
