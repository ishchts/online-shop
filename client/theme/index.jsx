import { ThemeProvider, createTheme, } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LinkBehavior } from './LinkBehavior';
import { blue } from '@mui/material/colors';
// import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'; // почему не работает InitColorSchemeScript

let theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                mode: 'light',
                primary: {
                  main: '#448aff',
                  contrastText: '#fff',
                },
                secondary: blue,
                background: {
                    default: '#fff',
                },
            },
        },
        dark: {
            palette: {
                mode: 'dark',
                customColor: {
                    light: '#f0e68c',
                    main: '#ffd700', // Золотой
                    dark: '#b8860b',
                    contrastText: '#fff',
                },
            }
        },
    },
    breakpoints: {
        values: {
            xs: 320,
            sm: 768,
            md: 1024,
            lg: 1200,
            xl: 1536,
        }
    },
    typography: {
        // htmlFontSize: 16,
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        body1: {
            // backgroundColor: '#9f3b3b'
        }
    }
});
theme = createTheme({
    ...theme,
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            }
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            }
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: 'md',
            }
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained'
            },
            styleOverrides: {
                root: {
                    width: '100%',
                    padding: theme.spacing(4),
                    [theme.breakpoints.up('xs')]: {
                        backgroundColor: '#a00808'
                    },
                    [theme.breakpoints.up('sm')]: {
                        backgroundColor: '#eef607',
                        width: '50%',
                        padding: theme.spacing(4),
                    },
                    [theme.breakpoints.up('md')]: {
                        backgroundColor: '#6bf607',
                    },
                    [theme.breakpoints.up('lg')]: {
                        backgroundColor: '#17e2e9',
                    },
                    [theme.breakpoints.up('xl')]: {
                        backgroundColor: '#1725e9',
                    },  
                    variants: [
                        {
                            props: { variant: 'dashed' },
                            style: {
                                textTransform: 'none', // Убираем верхний регистр
                                border: `2px dashed #7893ca`, // Рамка из пунктирной линии
                            },
                        },
                    ]
                },
                containedPrimary: {
                    '&:hover': {
                      backgroundColor: '#155a9d',
                    },
                    [theme.breakpoints.up('xs')]: {
                        backgroundColor: theme.palette.primary.light,
                        padding: '10px 20px',
                        fontSize: '16px',
                        color: theme.palette.primary.contrastText,
                    },
                },
            }
        },
        StyledInput: {
            defaultProps: {
                variant: 'outlined'
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#000'
                },
                qwe: {
                    backgroundColor: '#d62929'
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    boxShadow: theme.shadows[10],
                    backgroundColor: theme.palette.primary.light,
                    primary: '#fff',
                },
            }
        },
    }
});

export const Theme = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {/* <InitColorSchemeScript defaultMode='dark' /> */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}