import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

export default function useThemeVariables() {
    const theme = useTheme();

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--fc-primary', theme.palette.primary.main);
        root.style.setProperty('--fc-primary-contrast', theme.palette.primary.contrastText);
        root.style.setProperty('--fc-secondary', theme.palette.secondary.main);
        root.style.setProperty('--fc-bg', theme.palette.background.paper);
        root.style.setProperty('--fc-bg-hover', theme.palette.background.dark);
        root.style.setProperty('--fc-text', theme.palette.text.primary);
        root.style.setProperty('--fc-text-secondary', theme.palette.text.secondary);
        root.style.setProperty('--fc-grid-border', theme.palette.secondary.grid);
        root.style.setProperty('--fc-today-column-bg', theme.palette.primary.todayCol);
    }, [theme]);
}
