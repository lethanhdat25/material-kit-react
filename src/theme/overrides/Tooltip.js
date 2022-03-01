// ----------------------------------------------------------------------

export default function tooltip(theme) {
    return {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: theme.palette.grey[800]
                },
                arrow: {
                    color: theme.palette.grey[800]
                }
            }
        }
    };
}
