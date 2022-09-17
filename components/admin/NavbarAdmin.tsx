import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export const NavbarAdmin = () => {
    const { asPath } = useRouter()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: 'none' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box flexGrow={1} />
                    <NextLink href='/' passHref>
                        <Link sx={{ textDecoration: 'none' }}>
                            <Button variant={asPath == '/' ? 'contained' : 'text'}>
                                <Typography variant='button' sx={{ color: asPath == '/' ? 'white' : 'black' }}>
                                    Dashboard
                                </Typography>
                            </Button>
                        </Link>
                    </NextLink>
                    <Box flexGrow={1} />
                    <NextLink href='/admin/pedidos' passHref>
                        <Link sx={{ textDecoration: 'none' }}>
                            <Button variant={asPath == '/admin/pedidos' ? 'contained' : 'text'}>
                                <Typography variant='button' sx={{ color: asPath == '/admin/pedidos' ? 'white' : 'black' }}>
                                    Pedidos
                                </Typography>
                            </Button>
                        </Link>
                    </NextLink>
                    <Box flexGrow={1} />

                </Toolbar>
            </AppBar>
        </Box>
    );
}