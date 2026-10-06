/**
 * Report generation helper for printing / exporting analysis.
 */

export function generatePrintableReport(testResult, aboutInfo = {}) {
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

  const collegeName = aboutInfo.collegeName || 'College of Science & Engineering';
  const teamMembers = aboutInfo.teamMembers || [
    'Student Member 1',
    'Student Member 2',
    'Student Member 3',
    'Student Member 4',
    'Student Member 5',
    'Student Member 6'
  ];

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export the report.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Hypothesis Testing Report - Canteen Truth Detector</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1e293b;
          line-height: 1.5;
          margin: 0;
          padding: 30px;
          background: #ffffff;
        }
        .header {
          border-bottom: 3px solid #2563eb;
          padding-bottom: 15px;
          margin-bottom: 25px;
        }
        .institution {
          font-size: 14px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .title {
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
          margin: 5px 0;
        }
        .subtitle {
          font-size: 16px;
          color: #2563eb;
          font-weight: 600;
        }
        .academic-badge {
          display: inline-block;
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          margin-top: 8px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 5px;
          margin-bottom: 12px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .stat-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px 15px;
        }
        .stat-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 600;
        }
        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-top: 4px;
        }
        .decision-box {
          border-radius: 8px;
          padding: 18px;
          margin: 20px 0;
          background: ${isRejected ? '#fef2f2' : '#f0fdf4'};
          border: 2px solid ${isRejected ? '#ef4444' : '#22c55e'};
        }
        .decision-title {
          font-size: 20px;
          font-weight: 800;
          color: ${isRejected ? '#991b1b' : '#166534'};
          margin-bottom: 5px;
        }
        .decision-text {
          font-size: 14px;
          color: ${isRejected ? '#7f1d1d' : '#14532d'};
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #cbd5e1;
          padding: 8px 12px;
          text-align: left;
          font-size: 13px;
        }
        th {
          background: #f1f5f9;
          font-weight: 700;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        .team-member {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
        }
        .footer {
          margin-top: 40px;
          padding-top: 15px;
          border-top: 1px solid #e2e8f0;
          font-size: 12px;
          color: #94a3b8;
          text-align: center;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="institution">${collegeName}</div>
        <div class="title">🥤 Canteen Truth Detector</div>
        <div class="subtitle">Statistical Hypothesis Testing Report</div>
        <div class="academic-badge">Module VII — Testing of Hypothesis – I</div>
      </div>

      <div class="section">
        <div class="section-title">1. Research Scenario & Claim</div>
        <p><strong>Canteen Claim (Null Hypothesis):</strong> The average juice volume per cup is exactly <strong>${claimedMean} ml</strong> (H₀: μ = ${claimedMean}).</p>
        <p><strong>Alternative Hypothesis:</strong> The average juice volume per cup is not equal to <strong>${claimedMean} ml</strong> (H₁: μ ≠ ${claimedMean}).</p>
        <p><strong>Test Type:</strong> Two-Tailed One-Sample t-Test at significance level <strong>α = ${alpha}</strong>.</p>
      </div>

      <div class="decision-box">
        <div class="decision-title">
          ${isRejected ? '🔴 CLAIM REJECTED (H₀ Rejected)' : '🟢 CLAIM SUPPORTED (Fail to Reject H₀)'}
        </div>
        <div class="decision-text">${academicWording}</div>
      </div>

      <div class="section">
        <div class="section-title">2. Sample Statistics & Test Output</div>
        <div class="grid">
          <div class="stat-card">
            <div class="stat-label">Sample Size (n)</div>
            <div class="stat-value">${n} cups</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Sample Mean (x̄)</div>
            <div class="stat-value">${sampleMean.toFixed(2)} ml</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Sample Std Dev (s)</div>
            <div class="stat-value">${sampleSD.toFixed(2)} ml</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Standard Error (SE)</div>
            <div class="stat-value">${standardError.toFixed(3)} ml</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">t-Statistic (t)</div>
            <div class="stat-value">${tStat.toFixed(4)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Degrees of Freedom (df)</div>
            <div class="stat-value">${df}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">p-Value</div>
            <div class="stat-value">${pValue < 0.0001 ? '< 0.0001' : pValue.toFixed(4)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Critical t-Value (α=${alpha})</div>
            <div class="stat-value">±${criticalValue.toFixed(4)}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">3. Raw Sample Data (${n} Observations)</div>
        <table>
          <thead>
            <tr>
              <th>Cup Number</th>
              <th>Measured Quantity (ml)</th>
              <th>Deviation from Claim (${sampleMean > claimedMean ? '+' : ''}${(sampleMean - claimedMean).toFixed(1)} ml mean)</th>
            </tr>
          </thead>
          <tbody>
            ${data.map((val, idx) => `
              <tr>
                <td>Cup ${idx + 1}</td>
                <td>${val} ml</td>
                <td>${(val - claimedMean > 0 ? '+' : '')}${(val - claimedMean).toFixed(1)} ml</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">4. Statistical Decision Rules</div>
        <ul>
          <li><strong>Critical Value Method:</strong> Compare |t| = ${Math.abs(tStat).toFixed(4)} with Critical Value = ${criticalValue.toFixed(4)}. Since |t| ${Math.abs(tStat) > criticalValue ? '>' : '≤'} ${criticalValue.toFixed(4)}, we ${isRejected ? 'reject' : 'fail to reject'} H₀.</li>
          <li><strong>p-Value Method:</strong> Compare p-value = ${pValue.toFixed(4)} with α = ${alpha}. Since p-value ${pValue < alpha ? '<' : '≥'} ${alpha}, we ${isRejected ? 'reject' : 'fail to reject'} H₀.</li>
        </ul>
      </div>

      <div class="section">
        <div class="section-title">5. Academic Project Details</div>
        <p><strong>Subject:</strong> Statistics / Testing of Hypothesis – I (Module VII)</p>
        <p><strong>Institution:</strong> ${collegeName}</p>
        <div style="font-weight:600; margin-top:10px;">Project Team Members:</div>
        <div class="team-grid">
          ${teamMembers.map(m => `<div class="team-member">👤 ${m}</div>`).join('')}
        </div>
      </div>

      <div class="footer">
        Generated automatically by 🥤 Canteen Truth Detector • ${dateStr}
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
