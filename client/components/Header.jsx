import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Container, AppBar, Toolbar, IconButton, Typography, InputBase, Tabs, Tab, Button, Grid } from '@mui/material';
/*

[todo] После импорта иконок появляется ошибка, которая исправлятеся добавлением noExternal: ['@mui/icons-material'] в vite.config.js после этого 
долго выполнятся запуск сервера npm run dev и сборка статики.

import { 
    Menu as MenuIcon,
    Search as SearchIcon
} from '@mui/icons-material';

Помог испорт по умолчанию.
*/
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ToggleThemeButton } from './ToggleThemeButton';
const MuiHeader = styled(
    'header',
    {
        name: 'MuiHeader',
        slot: 'root'
    }
)();

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const Header = () => {
    return (
      <MuiHeader>
        <Container>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <InputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <ToggleThemeButton sx={{ marginLeft: 'auto', marginRight: 0 }} />
                </Toolbar>
            </AppBar>
            <Tabs
                variant="scrollable"
                allowScrollButtonsMobile
                scrollButtons={true}
            >
                <Tab component={Button} href='/' label='Главная' />
                <Tab component={Button} href='/category' label='Каталог' />
                <Tab component={Button} href='/cart' label='Корзина' />
            </Tabs>
        </Container>
      </MuiHeader>
    )
}