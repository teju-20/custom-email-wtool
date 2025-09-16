import { Metric, onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (!onPerfEntry) return;

  onCLS(onPerfEntry);
  onFCP(onPerfEntry);
  onLCP(onPerfEntry);
  onTTFB(onPerfEntry);
};

export default reportWebVitals;
