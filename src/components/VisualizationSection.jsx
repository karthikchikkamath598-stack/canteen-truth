import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ReferenceLine,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts';
import { generateTDistributionCurve } from '../utils/stats';
import { BarChart2, PieChart, Activity } from 'lucide-react';

export default function VisualizationSection({ testResult }) {
  if (!testResult || !testResult.isValid) return null;

  const {
    data,
    claimedMean,
    sampleMean,
    tStat,
    criticalValue,
    df,
    isRejected
  } = testResult;

  // Chart 1 Data: Sample Measurements
  const sampleChartData = data.map((val, idx) => ({
    name: `Cup ${idx + 1}`,
    value: val,
    diff: parseFloat((val - claimedMean).toFixed(1))
  }));

  // Chart 2 Data: Distribution Bins (Histogram)
  const minVal = Math.floor(Math.min(...data) - 2);
  const maxVal = Math.ceil(Math.max(...data) + 2);
  const binWidth = Math.max(2, Math.round((maxVal - minVal) / 6));

  const bins = [];
  for (let b = minVal; b <= maxVal; b += binWidth) {
    const count = data.filter((v) => v >= b && v < b + binWidth).length;
    bins.push({
      binLabel: `${b}-${b + binWidth} ml`,
      count,
      rangeStart: b,
      rangeEnd: b + binWidth
    });
  }

  // Chart 3: t-Distribution Bell Curve calculation
  const curveInfo = generateTDistributionCurve(df, tStat, criticalValue, 140);
  const { points, minT, maxT } = curveInfo;

  // SVG Coordinates setup
  const svgWidth = 800;
  const svgHeight = 240;
  const paddingX = 40;
  const paddingY = 30;
  const plotW = svgWidth - 2 * paddingX;
  const plotH = svgHeight - 2 * paddingY;

  const maxDensity = Math.max(...points.map((p) => p.density));

  const mapX = (tVal) => paddingX + ((tVal - minT) / (maxT - minT)) * plotW;
  const mapY = (dens) => svgHeight - paddingY - (dens / maxDensity) * plotH;

  // Build SVG path data for bell curve
  const bellPathData = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${mapX(p.t).toFixed(1)} ${mapY(p.density).toFixed(1)}`)
    .join(' ');

  // Left Rejection polygon path
  const leftPoints = points.filter((p) => p.t <= -criticalValue);
  let leftPath = '';
  if (leftPoints.length > 0) {
    const firstX = mapX(leftPoints[0].t);
    const lastX = mapX(leftPoints[leftPoints.length - 1].t);
    const baselineY = svgHeight - paddingY;
    leftPath = leftPoints
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${mapX(p.t).toFixed(1)} ${mapY(p.density).toFixed(1)}`)
      .join(' ') + ` L ${lastX.toFixed(1)} ${baselineY} L ${firstX.toFixed(1)} ${baselineY} Z`;
  }

  // Right Rejection polygon path
  const rightPoints = points.filter((p) => p.t >= criticalValue);
  let rightPath = '';
  if (rightPoints.length > 0) {
    const firstX = mapX(rightPoints[0].t);
    const lastX = mapX(rightPoints[rightPoints.length - 1].t);
    const baselineY = svgHeight - paddingY;
    rightPath = rightPoints
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${mapX(p.t).toFixed(1)} ${mapY(p.density).toFixed(1)}`)
      .join(' ') + ` L ${lastX.toFixed(1)} ${baselineY} L ${firstX.toFixed(1)} ${baselineY} Z`;
  }

  // t-statistic Pin position
  const clampedT = Math.max(minT, Math.min(maxT, tStat));
  const tPinX = mapX(clampedT);
  const tPinDensity = points.reduce((prev, curr) => Math.abs(curr.t - clampedT) < Math.abs(prev.t - clampedT) ? curr : prev).density;
  const tPinY = mapY(tPinDensity);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Chart 1: Sample Measurements vs Claim */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <BarChart2 size={22} style={{ color: '#3b82f6' }} /> Chart 1 — Individual Cup Measurements vs Claimed Mean
            </h2>
            <p className="card-subtitle">
              Visualizing measured volume per cup against canteen claim of {claimedMean} ml.
            </p>
          </div>
          <span className="academic-chip">Observed Data</span>
        </div>

        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleChartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis domain={['auto', 'auto']} stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', color: '#fff' }}
                formatter={(val) => [`${val} ml`, 'Measured Volume']}
              />
              <ReferenceLine y={claimedMean} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" label={{ value: `Claimed: ${claimedMean} ml`, fill: '#ef4444', fontSize: 12, position: 'top' }} />
              <Bar dataKey="value" name="Volume (ml)" radius={[4, 4, 0, 0]}>
                {sampleChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value >= claimedMean ? '#3b82f6' : '#f59e0b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Sample Frequency Distribution */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <PieChart size={22} style={{ color: '#8b5cf6' }} /> Chart 2 — Sample Frequency Distribution (Histogram)
            </h2>
            <p className="card-subtitle">
              Distribution spread of cup measurements across volume bins.
            </p>
          </div>
          <span className="academic-chip">Frequency Spread</span>
        </div>

        <div style={{ width: '100%', height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bins} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="binLabel" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis allowDecimals={false} stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="count" name="Cups Count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Hypothesis Test Bell Curve Visualization */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <Activity size={22} style={{ color: '#10b981' }} /> Chart 3 — Student's t-Distribution & Decision Regions
            </h2>
            <p className="card-subtitle">
              Interactive bell-curve displaying Rejection Regions (α={testResult.alpha}), Critical t-values (±{criticalValue.toFixed(2)}), and calculated t-statistic ({tStat.toFixed(2)}).
            </p>
          </div>
          <span className="academic-chip">t-Distribution (df={df})</span>
        </div>

        <div className="bell-curve-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Left Rejection Shaded Region */}
            {leftPath && <path d={leftPath} fill="rgba(239, 68, 68, 0.4)" stroke="none" />}

            {/* Right Rejection Shaded Region */}
            {rightPath && <path d={rightPath} fill="rgba(239, 68, 68, 0.4)" stroke="none" />}

            {/* Main Bell Curve Path */}
            <path d={bellPathData} fill="none" stroke="#60a5fa" strokeWidth="3" />

            {/* Baseline X-axis */}
            <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#475569" strokeWidth="2" />

            {/* Critical Value Dashed Line Left (-t_crit) */}
            <line
              x1={mapX(-criticalValue)}
              y1={paddingY}
              x2={mapX(-criticalValue)}
              y2={svgHeight - paddingY}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Critical Value Dashed Line Right (+t_crit) */}
            <line
              x1={mapX(criticalValue)}
              y1={paddingY}
              x2={mapX(criticalValue)}
              y2={svgHeight - paddingY}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Center Mean Line (t=0) */}
            <line
              x1={mapX(0)}
              y1={mapY(maxDensity)}
              x2={mapX(0)}
              y2={svgHeight - paddingY}
              stroke="#94a3b8"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Calculated t-Statistic Pin Line */}
            <line
              x1={tPinX}
              y1={paddingY - 10}
              x2={tPinX}
              y2={svgHeight - paddingY}
              stroke={isRejected ? '#ef4444' : '#22c55e'}
              strokeWidth="3"
            />
            {/* Glowing circle pin head */}
            <circle
              cx={tPinX}
              cy={paddingY - 10}
              r="6"
              fill={isRejected ? '#ef4444' : '#22c55e'}
              stroke="#fff"
              strokeWidth="2"
            />

            {/* Text Labels */}
            <text x={mapX(0)} y={svgHeight - 10} fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">
              t = 0 (μ₀)
            </text>

            <text x={mapX(-criticalValue)} y={svgHeight - 10} fill="#ef4444" fontSize="11" textAnchor="middle" fontWeight="bold">
              -t_crit (-{criticalValue.toFixed(2)})
            </text>

            <text x={mapX(criticalValue)} y={svgHeight - 10} fill="#ef4444" fontSize="11" textAnchor="middle" fontWeight="bold">
              +t_crit (+{criticalValue.toFixed(2)})
            </text>

            <text x={tPinX} y={paddingY - 20} fill={isRejected ? '#f87171' : '#4ade80'} fontSize="13" textAnchor="middle" fontWeight="bold">
              Calculated t = {tStat.toFixed(2)}
            </text>

            {/* Region Annotations */}
            <text x={paddingX + 20} y={paddingY + 30} fill="#f87171" fontSize="11" fontWeight="bold">
              Reject H₀ Region
            </text>
            <text x={svgWidth - paddingX - 90} y={paddingY + 30} fill="#f87171" fontSize="11" fontWeight="bold">
              Reject H₀ Region
            </text>
            <text x={mapX(0)} y={paddingY + 50} fill="#4ade80" fontSize="12" textAnchor="middle" fontWeight="bold">
              Fail to Reject H₀ Region (1 - α)
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
