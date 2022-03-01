import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, Divider, IconButton, MenuItem, Typography } from '@mui/material';
// material
import { alpha } from '@mui/material/styles';
import { useRef, useState } from 'react';
//
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { removeUser } from 'src/utils/sessionStorage';
// components
import MenuPopover from '../../components/MenuPopover';
import { logout } from '../../store/slice/loginAndLogout';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: homeFill,
        linkTo: '/'
    },
    {
        label: 'Profile',
        icon: personFill,
        linkTo: '#'
    },
    {
        label: 'Settings',
        icon: settings2Fill,
        linkTo: '#'
    }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = sessionStorage.getItem('userName');
    const gmail = sessionStorage.getItem('userGmail');
    const photoURL = '/static/mock-images/avatars/avatar_default.jpg';

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        removeUser();
        navigate('/login', { replace: true });
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: '""',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                        }
                    })
                }}
            >
                <Avatar src={photoURL} alt="photoURL" />
            </IconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{ width: 220 }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle1" noWrap>
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {gmail}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                {MENU_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.label}
                        to={option.linkTo}
                        component={RouterLink}
                        onClick={handleClose}
                        sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                        <Box
                            component={Icon}
                            icon={option.icon}
                            sx={{
                                mr: 2,
                                width: 24,
                                height: 24
                            }}
                        />

                        {option.label}
                    </MenuItem>
                ))}

                <Divider sx={{ my: 1 }} />
                <Box sx={{ p: 2, pt: 1.5 }}>
                    <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </MenuPopover>
        </>
    );
}
