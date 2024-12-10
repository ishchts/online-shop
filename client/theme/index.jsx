import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { LinkBehavior } from './LinkBehavior';
// import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'; // почему не работает InitColorSchemeScript

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 768,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
  palette: {
    primary: {
      main: '#3A5E8C', // Глубокий синий (основной)
      light: '#637AAE', // Светлый оттенок
      dark: '#2B4870', // Тёмный оттенок
      contrastText: '#FFFFFF', // Цвет текста на кнопках
    },
    secondary: {
      main: '#8A4DCC', // Фиолетовый акцент
      light: '#B084E7',
      dark: '#6A39A4',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F6F8', // Фон приложения
      paper: '#FFFFFF', // Цвет карточек/панелей
    },
    text: {
      primary: '#2D2F33', // Основной текст
      secondary: '#64696D', // Вторичный текст
      disabled: '#B0B3B5', // Отключенный текст
    },
    divider: '#E0E0E0', // Цвет разделителей
    error: {
      main: '#D9534F', // Цвет для ошибок
    },
    success: {
      main: '#5CB85C', // Цвет для успешных действий
    },
    warning: {
      main: '#F0AD4E', // Цвет для предупреждений
    },
    info: {
      main: '#5BC0DE', // Цвет для информационных сообщений
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '3rem', // Крупный заголовок
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#2D2F33',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      color: '#3A5E8C',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#2B4870',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#64696D',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#64696D',
    },
    button: {
      fontSize: '0.9rem',
      fontWeight: 600,
      textTransform: 'none', // Снимаем капс
    },
    caption: {
      fontSize: '0.8rem',
      color: '#B0B3B5',
    },
  },
});
theme = createTheme({
  ...theme,
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E0E0E0',
          padding: '10px 14px',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#B0B3B5',
          },
          '&.Mui-focused': {
            borderColor: '#3A5E8C',
            boxShadow: '0 0 4px rgba(58, 94, 140, 0.3)', // Светящийся акцент при фокусе
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
      styleOverrides: {
        root: {
          color: '#3A5E8C',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'color 0.3s ease, transform 0.2s',
          '&:hover': {
            color: '#2B4870',
            transform: 'translateY(-2px)', // Лёгкий эффект подъёма
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Более округлые кнопки
          padding: '10px 20px',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)', // Лёгкий эффект увеличения
            boxShadow: '0px 6px 12px rgba(58, 94, 140, 0.2)', // Тень при наведении
          },
          [theme.breakpoints.up('sm')]: {
            padding: '12px 24px',
          },
        },
        containedPrimary: {
          backgroundColor: '#3A5E8C',
          '&:hover': {
            backgroundColor: '#2B4870',
          },
        },
        containedSecondary: {
          backgroundColor: '#8A4DCC',
          '&:hover': {
            backgroundColor: '#6A39A4',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px', // Более округлые края
          padding: '20px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Лёгкая тень
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)', // Тень при наведении
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E0E0E0', // Разделитель
          minHeight: '48px',
          '& .MuiTabs-scrollButtons': {
            color: '#B0B3B5', // Цвет стрелок для прокрутки
            '&:hover': {
              color: '#3A5E8C',
            },
          },
        },
        indicator: {
          height: '4px', // Толщина индикатора
          backgroundColor: '#3A5E8C', // Цвет индикатора
          borderRadius: '2px', // Закругление
          transition: 'all 0.3s ease', // Анимация переключения
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: '100px', // Минимальная ширина
          padding: '8px 16px', // Отступы
          fontWeight: 500,
          fontSize: '0.9rem',
          textTransform: 'none', // Снимаем капс
          color: '#64696D', // Цвет текста
          borderRadius: '8px 8px 0 0', // Закругленные углы сверху
          transition: 'all 0.3s ease',
          '&:hover': {
            color: '#3A5E8C',
            backgroundColor: '#F4F6F8', // Лёгкий фон при наведении
          },
          '&.Mui-selected': {
            color: '#3A5E8C', // Цвет активного таба
            fontWeight: 600,
          },
          [theme.breakpoints.up('sm')]: {
            fontSize: '0.8rem', // Размер для мобильных
            padding: '6px 12px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#3A5E8C', // Основной цвет AppBar
          color: '#FFFFFF', // Цвет текста
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Тень
          borderRadius: '0 0 12px 12px', // Закруглённые края снизу
          padding: '10px 20px',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '48px', // Высота тулбара
          padding: '0 24px', // Отступы по горизонтали
          display: 'flex',
          justifyContent: 'space-between', // Равномерное распределение элементов
          alignItems: 'center',
          [theme.breakpoints.up('sm')]: {
            minHeight: '48px',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Основной цвет кнопки
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Лёгкий эффект наведения
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px', // Закруглённые края
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Тень
          padding: '16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)', // Лёгкое поднятие при наведении
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)', // Увеличенная тень
          },
        },
      },
    },
  },
});

export const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {/* <InitColorSchemeScript defaultMode='dark' /> */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
