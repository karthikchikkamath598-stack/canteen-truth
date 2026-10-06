import React from 'react';
import { BookOpen, HelpCircle, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function LearnConceptSection() {
  const concepts = [
    {
      title: 'What is Hypothesis Testing?',
      icon: '🧪',
      tag: 'Core Concept',
      desc: 'A formal statistical method used to evaluate whether empirical sample evidence provides enough statistical proof to support or challenge a claim about a whole population.'
    },
    {
      title: 'What is the Null Hypothesis (H₀)?',
      icon: '⚖️',
      tag: 'Default Assumption',
      desc: 'The initial claim assumed to be true until proven otherwise. In our project, H₀: μ = 250 ml (The canteen claim that average serving is 250 ml).'
    },
    {
      title: 'What is the Alternative Hypothesis (H₁)?',
      icon: '🎯',
      tag: 'Research Challenge',
      desc: 'The claim we are testing for evidence against H₀. In our project, H₁: μ ≠ 250 ml (A two-tailed challenge that the actual average serving differs from 250 ml).'
    },
    {
      title: 'What is Significance Level (α)?',
      icon: '🎚️',
      tag: 'Risk Threshold',
      desc: 'The maximum allowable probability of committing a Type I error (false alarm). Standard values are α = 0.05 (5%), α = 0.01 (1%), and α = 0.10 (10%).'
    },
    {
      title: 'What is a p-Value?',
      icon: '📊',
      tag: 'Evidence Measure',
      desc: 'The probability of obtaining sample data as extreme as (or more extreme than) our observed sample if H₀ were true. Smaller p-values (< α) provide stronger evidence against H₀.'
    },
    {
      title: 'What is a t-Statistic?',
      icon: '📐',
      tag: 'Test Metric',
      desc: 'A measure of how many standard errors the sample mean (x̄) deviates from the claimed population mean (μ₀). Calculated as t = (x̄ - μ₀) / (s / √n).'
    },
    {
      title: 'What is a Type I Error?',
      icon: '🚨',
      tag: 'False Alarm',
      desc: 'Rejecting H₀ when H₀ is actually true. (e.g. Accusing an honest canteen of under-filling when they actually serve 250 ml average).'
    },
    {
      title: 'What is a Type II Error?',
      icon: '🙈',
      tag: 'Missed Catch',
      desc: 'Failing to reject H₀ when H₀ is actually false. (e.g. Failing to catch a canteen that is serving short-filled cups).'
    },
    {
      title: 'What are Degrees of Freedom (df)?',
      icon: '🔗',
      tag: 'Sample Constraint',
      desc: 'The number of independent values that are free to vary when estimating statistical parameters. For a one-sample t-test, df = n - 1.'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <BookOpen size={22} style={{ color: '#3b82f6' }} /> Educational Concept Guide — Testing of Hypothesis I
          </h2>
          <p className="card-subtitle">
            Essential statistical definitions for academic presentations and exam preparation.
          </p>
        </div>
        <span className="academic-chip">Module VII Reference</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
        {concepts.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <span style={{ fontSize: '11px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                  {item.tag}
                </span>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
