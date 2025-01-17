// routes
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
// components
import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

// ----------------------------------------------------------------------

export default function App() {
    return (
        <ThemeConfig>
            <ScrollToTop />
            <GlobalStyles />
            <BaseOptionChartStyle />
            <Router />
        </ThemeConfig>
    );
}
