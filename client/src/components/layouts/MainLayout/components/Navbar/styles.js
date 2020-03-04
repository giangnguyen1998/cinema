export default  theme=>({
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.0rem 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        zIndex: 999,
        transition: 'all 300ms ease-in',
    },
    navbarColor: {
        position: 'fixed',
        padding: '1.0rem 20px',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        zIndex: 999,
        background: "#1A1A1A",
        transition: 'all 200ms ease-out'
    },
    containers: {
        color: "#fff",
    },
    persionals:{
        color:"#FFF",
        backgroundColor:"#2D2D2D"
    },
    logoLink: {
        display: 'inline-block',
        paddingTop: '.15rem',
        paddingBottom: '.15rem',
        marginRight: '20px',
        fontSize: '1.5rem',
        lineHeight: 'inherit',
        whiteSpace: 'nowrap',
        textDecoration: 'none'
    },
    logo: {
        maxHeight: '2.4rem',
        width: 'auto',
        fontSize: '2rem',
        letterSpacing: '1px',
        color: "#fff"
    },
    navLink: {
        position: 'relative',
        color: theme.palette.common.white,
        padding: '0 .5rem',
        margin: '0 1rem',
        fontSize: '1.2rem',
        fontWeight: '600',
        cursor: 'pointer',
        textDecoration: 'none',
        zIndex: 2,
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            opacity: 0,
            height: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
            transition: 'all 200ms linear',
            zIndex: 1
        },
        '&:hover:after': {
            opacity: 1,
            height: '9px'
        }
    },
});