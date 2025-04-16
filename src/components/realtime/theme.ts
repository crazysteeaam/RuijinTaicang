interface AnalyticsTheme {
  background: string;
  cardBg: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  chart: {
    primary: string;
    success: string;
    warning: string;
    error: string;
  };
}

export const ANALYTICS_THEME: AnalyticsTheme = {
  background: 'rgba(255, 255, 255, 0.9)',
  cardBg: '#ffffff',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  text: {
    primary: '#262626',
    secondary: '#595959',
    tertiary: '#8c8c8c'
  },
  chart: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  }
}; 