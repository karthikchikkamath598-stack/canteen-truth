/**
 * Statistical utilities for One-Sample t-test and Student's t-distribution.
 * Highly accurate numerical methods for academic demonstration.
 */

// Lanczos approximation for log gamma function ln(Γ(x))
export function logGamma(x) {
  if (x <= 0) return 0;
  const p = [
    676.5203681218851,
    -1259.139216722289,
    771.3234287776531,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.984369578019571e-6,
    1.5056327351493116e-7
  ];
  const g = 7;
  if (x < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }
  x -= 1;
  let a = 0.99999999999980993;
  for (let i = 0; i < p.length; i++) {
    a += p[i] / (x + i + 1);
  }
  const t = x + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

// Incomplete Beta function using Lentz's method for continued fraction
export function incompleteBeta(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  // Symmetry transformation
  if (x > (a + 1) / (a + b + 2)) {
    return 1 - incompleteBeta(1 - x, b, a);
  }

  const factor = Math.exp(
    a * Math.log(x) + b * Math.log(1 - x) - (logGamma(a) + logGamma(b) - logGamma(a + b))
  ) / a;

  // Continued fraction evaluation
  const maxIter = 200;
  const eps = 3e-14;

  let qab = a + b;
  let qap = a + 1;
  let qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < eps) d = eps;
  d = 1 / d;
  let h = d;

  for (let m = 1; m <= maxIter; m++) {
    let m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < eps) d = eps;
    c = 1 + aa / c;
    if (Math.abs(c) < eps) c = eps;
    d = 1 / d;
    h *= d * c;

    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < eps) d = eps;
    c = 1 + aa / c;
    if (Math.abs(c) < eps) c = eps;
    d = 1 / d;
    let del = d * c;
    h *= del;

    if (Math.abs(del - 1.0) < eps) break;
  }

  return factor * h;
}

/**
 * Two-tailed p-value for Student's t-distribution
 * @param {number} t - test statistic value
 * @param {number} df - degrees of freedom
 */
export function getTwoTailedPValue(t, df) {
  if (isNaN(t) || isNaN(df) || df < 1) return 1;
  const absT = Math.abs(t);
  const x = df / (df + absT * absT);
  const p = incompleteBeta(x, df / 2, 0.5);
  return Math.min(1, Math.max(0, p));
}

/**
 * Critical t-value for two-tailed test with significance level alpha and df degrees of freedom
 * Uses Newton-Raphson root finding on the two-tailed p-value function.
 */
export function getCriticalTValue(alpha, df) {
  if (df < 1 || alpha <= 0 || alpha >= 1) return 1.96;

  // Initial estimate using Normal approximation for z quantile
  // Hastings approximation for z_alpha/2
  const pTail = alpha / 2;
  const y = Math.sqrt(-2 * Math.log(pTail));
  const c0 = 2.515517, c1 = 0.802853, c2 = 0.010328;
  const d1 = 1.432788, d2 = 0.189269, d3 = 0.001308;
  let z = y - ((c2 * y + c1) * y + c0) / (((d3 * y + d2) * y + d1) * y + 1);

  // Cornish-Fisher correction for t-distribution from normal z
  let t = z + (z * z * z + z) / (4 * df) + (5 * Math.pow(z, 5) + 16 * Math.pow(z, 3) + 3 * z) / (96 * df * df);

  // Refine with Newton-Raphson iterations
  for (let i = 0; i < 10; i++) {
    const currentP = getTwoTailedPValue(t, df);
    const pdf = getTPDF(t, df);
    const error = currentP - alpha;
    if (Math.abs(error) < 1e-10) break;
    // derivative of two-tailed p wrt t is -2 * pdf(t)
    t = t - error / (-2 * pdf);
  }

  return Math.abs(t);
}

/**
 * Student's t PDF value f(t, df)
 */
export function getTPDF(t, df) {
  const numLog = logGamma((df + 1) / 2);
  const denLog = 0.5 * Math.log(df * Math.PI) + logGamma(df / 2);
  const factor = Math.exp(numLog - denLog);
  return factor * Math.pow(1 + (t * t) / df, -(df + 1) / 2);
}

/**
 * Perform One-Sample t-test on an array of numbers
 */
export function calculateOneSampleTTest(sampleData, claimedMean = 250, alpha = 0.05) {
  const validData = sampleData.filter(v => typeof v === 'number' && !isNaN(v));
  const n = validData.length;

  if (n < 2) {
    return {
      isValid: false,
      errorMsg: 'Please enter at least 2 valid sample measurements.',
      n,
      claimedMean,
      alpha
    };
  }

  const sum = validData.reduce((acc, curr) => acc + curr, 0);
  const sampleMean = sum / n;

  // Sample variance with n - 1 degrees of freedom
  const variance = validData.reduce((acc, curr) => acc + Math.pow(curr - sampleMean, 2), 0) / (n - 1);
  const sampleSD = Math.sqrt(variance);

  if (sampleSD === 0) {
    return {
      isValid: false,
      errorMsg: 'The test cannot be performed because all observations are identical (SD = 0).',
      n,
      sampleMean,
      claimedMean,
      alpha
    };
  }

  const standardError = sampleSD / Math.sqrt(n);
  const tStat = (sampleMean - claimedMean) / standardError;
  const df = n - 1;

  const pValue = getTwoTailedPValue(tStat, df);
  const criticalValue = getCriticalTValue(alpha, df);

  const isRejected = pValue < alpha; // Or Math.abs(tStat) > criticalValue

  return {
    isValid: true,
    data: validData,
    n,
    claimedMean,
    alpha,
    sampleMean,
    sampleSD,
    variance,
    standardError,
    tStat,
    df,
    pValue,
    criticalValue,
    isRejected,
    decisionText: isRejected
      ? 'Reject H₀ — Claim is Challenged'
      : 'Fail to Reject H₀ — Claim is Supported',
    academicWording: isRejected
      ? 'There is sufficient statistical evidence to conclude that the average juice quantity is significantly different from 250 ml.'
      : 'There is not enough statistical evidence to conclude that the average juice quantity differs from 250 ml.'
  };
}

/**
 * Generate curve points for plotting Student's t-distribution
 */
export function generateTDistributionCurve(df, tStat, criticalValue, pointsCount = 120) {
  const maxT = Math.max(3.8, Math.abs(tStat) + 0.8, criticalValue + 0.8);
  const minT = -maxT;
  const step = (maxT - minT) / (pointsCount - 1);

  const points = [];
  for (let i = 0; i < pointsCount; i++) {
    const t = minT + i * step;
    const density = getTPDF(t, df);
    const isRejectionRegion = Math.abs(t) >= criticalValue;
    points.push({
      t: parseFloat(t.toFixed(3)),
      density,
      isRejectionRegion,
      isLeftRejection: t <= -criticalValue,
      isRightRejection: t >= criticalValue
    });
  }

  return {
    points,
    minT,
    maxT
  };
}

/**
 * Generate random samples for Simulation mode
 */
export function generateSimulatedData(trueMean, count, sd) {
  const data = [];
  for (let i = 0; i < count; i++) {
    // Box-Muller transform for normal random variables
    const u1 = Math.random() || 1e-6;
    const u2 = Math.random() || 1e-6;
    const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const val = trueMean + z * sd;
    data.push(parseFloat(val.toFixed(1)));
  }
  return data;
}

/**
 * Preset Datasets for Quick Testing
 */
export const PRESET_DATASETS = [
  {
    id: 'default',
    name: 'Standard Canteen Audit (Default)',
    description: 'Realistic sample of 10 cups around 248-252 ml',
    claimedMean: 250,
    alpha: 0.05,
    values: [245, 252, 248, 241, 255, 249, 247, 251, 244, 250]
  },
  {
    id: 'preset_a',
    name: 'Dataset A — Honest Serving (Fail to Reject H₀)',
    description: '10 cups with average close to 250 ml (No significant difference)',
    claimedMean: 250,
    alpha: 0.05,
    values: [249, 251, 250, 248, 252, 250, 247, 251, 249, 253]
  },
  {
    id: 'preset_b',
    name: 'Dataset B — Under-filled / Shortage (Reject H₀)',
    description: '10 cups consistently underfilled (Avg ~241 ml, strong evidence against H₀)',
    claimedMean: 250,
    alpha: 0.05,
    values: [238, 241, 240, 244, 239, 242, 245, 237, 241, 243]
  },
  {
    id: 'preset_c',
    name: 'Dataset C — Over-filled / Generous (Reject H₀)',
    description: '10 cups overfilled (Avg ~259 ml, statistically significant surplus)',
    claimedMean: 250,
    alpha: 0.05,
    values: [258, 261, 259, 256, 262, 260, 257, 263, 259, 261]
  }
];
