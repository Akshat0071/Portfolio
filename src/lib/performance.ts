  // Performance monitoring utilities
type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
      onCLS?.(onPerfEntry);
      onFCP?.(onPerfEntry);
      onLCP?.(onPerfEntry);
      onTTFB?.(onPerfEntry);
    }).catch((error) => {
      console.warn('Failed to load web-vitals', error);
    });
  }
};


/**
 * Track page views in Google Analytics
 * @param url - The URL of the page being tracked
 */
export const trackPageView = (url: string): void => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (typeof window.gtag === 'function' && measurementId) {
    try {
      window.gtag('config', measurementId, {
        page_path: url,
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }
};

/**
 * Track custom events in Google Analytics
 * @param event - The event details
 */
export const trackEvent = (event: GTagEvent): void => {
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
};

/**
 * Track Web Vitals metrics
 * @param metric - The Web Vitals metric
 */
export const trackWebVitals = (metric: any): void => {
  // Log metrics to console in development
  if (import.meta.env.DEV) {
    console.log(metric);
  }
  
  // Send metrics to Google Analytics in production
  if (import.meta.env.PROD && typeof window.gtag === 'function') {
    trackEvent({
      action: 'web-vitals',
      category: 'Web Vitals',
      label: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    });
  }
};

export { reportWebVitals };
