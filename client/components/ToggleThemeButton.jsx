import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { IconButton, styled } from '@mui/material';
import { useTheme, useColorScheme } from '@mui/material/styles';

export const ToggleThemeButton = styled((props) => {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  // eslint-disable-next-line no-console
  console.log('theme.applyStyles()', theme.applyStyles('dark'));

  return (
    <IconButton
      {...props}
      sx={{ color: '#fff' }}
      onClick={() => {
        const newMode = mode !== 'dark' ? 'dark' : 'light';
        setMode(newMode);
      }}
    >
      {mode === 'dark' && <DarkModeIcon />}
      {mode === 'light' && <WbSunnyIcon />}
    </IconButton>
  );
})();
