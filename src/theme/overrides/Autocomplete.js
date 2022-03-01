// ----------------------------------------------------------------------

export default function autoComplete(theme) {
    return {
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    boxShadow: theme.customShadows.z20
                }
            }
        }
    };
}
