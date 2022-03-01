// ----------------------------------------------------------------------

export default function paper() {
    return {
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },

            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                }
            }
        }
    };
}
