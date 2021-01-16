const theme = {
    palette: {
        primary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
        secondary: {
            light: "#323232",
            main: "#242424",
            dark: "#0a0a0a",
            contrastText: "#fff",
        },
    },
    profileStyles: {
        paper: {
            padding: 20
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: "#f44336"
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        }
    },
    signStyles: {
        typography: {
            useNextVariants: true,
        },
        form: {
            textAlign: 'center'
        },
        logo: {
            width: 60,
            margin: '20px auto 10px auto',
        },
        pageTitle: {
            margin: '10px auto 10px auto',
        },
        textField: {
            margin: '10px auto 10px auto',
        },
        button: {
            marginTop: 20,
            marginBottom: 20,
            position: 'relative',
            width: 110,
            height: 40,
        },
        customError: {
            color: "red",
            fontSize: '0.8rem',
            marginTop: 10
        },
        progress: {
            position: 'absolute'
        }
    },
    editProfileStyles: {
        textField: {
            marginTop: 10
        },
        button: {
            float: "right"
        }
    }
}

export default theme