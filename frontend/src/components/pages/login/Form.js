import React, { useState, createContext } from 'react'
import { ThemeProvider, withStyles } from 'react-jss'
import { FaPlusCircle, FaArrowLeft } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setUserAuth } from '../../../redux/actions/userAuthentication';
import { handleLogin, handleRegister } from '../../../axios/handleSession';

const mainTheme = {
    sizes: {
        container: '850px'
    },
    colors: {
        primary: '#4299e1',
        primaryLight: '#fff',
        secondary: '#818CF8',
        secondaryLight: '#fff',
        green: '#10B981'
    }
}

const lightTheme = {
    ...mainTheme,
    type: 'light',
    background: {
        default: '#f7fafc',
        paper: '#fff',
        linkHover: '#edf2f7',
        input: '#fff',
    },
    alert: {
        error: '#fff0f3',
        success: '#a7f3d0'
    },
    border: {
        primary: '#e2e2e2',
        input: '#e2e8f0'
    },
    progress: {
        linear: '#e6fffa',
        linearBar: '#bde8e0'
    },
    text: {
        primary: '#000',
        link: '#718096',
        activeLink: '#2b3044',
        outlinedButton: '#4c4f52',
        input: '#4a5568',
    },
    snackbar: {
        background: '#323232',
        text: '#fff'
    },
    blob: 'EAE8F9'
}

const darkTheme = {
    ...mainTheme,
    type: 'dark',
    background: {
        default: '#161a23',
        paper: '#252836',
        linkHover: '#1c2633',
        input: '#2d303e',
    },
    alert: {
        error: '#a54a5c',
        success: '#359a6c'
    },
    border: {
        primary: '#43454e',
        input: '#505261'
    },
    progress: {
        linear: '#588e83',
        linearBar: '#32695f'
    },
    text: {
        primary: '#fff',
        link: '#8493a9',
        activeLink: '#9b9fb1',
        outlinedButton: '#fff',
        input: '#cccede',
    },
    snackbar: {
        background: '#fff',
        text: '#000'
    },
    blob: '6373b3'
}

const loginLayoutStyles = theme => ({
    loginLayout: {
        maxWidth: '100%',
        minHeight: '100%',
        margin: "1% 0",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `${theme.background.default} url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 200 200" xml:space="preserve" height="800px" width="800px"><g><path fill="%23${theme.blob}" d="M41.3,-52.9C54.4,-47.3,66.6,-36.4,73.8,-22.1C81,-7.8,83.2,10,75.4,21.7C67.7,33.4,50.1,39.1,35.9,47.5C21.7,56,10.8,67.3,0,67.3C-10.8,67.3,-21.6,55.9,-35.7,47.4C-49.9,38.9,-67.3,33.2,-70,23.2C-72.7,13.1,-60.6,-1.3,-53.8,-15.9C-46.9,-30.5,-45.3,-45.3,-37.2,-52.5C-29.1,-59.7,-14.6,-59.4,-0.2,-59.1C14.1,-58.7,28.2,-58.5,41.3,-52.9Z" transform="translate(100 100) scale(1.21)" fill-rule="nonzero"/></g></svg>') 50% no-repeat`,
    },
    rightAngleAction: {
        position: 'absolute',
        top: '10px',
        right: '20px'
    }
});

const loginPageStyles = theme => ({
    '@keyframes slideLeft': {
        from: {
            opacity: 0,
            transform: 'translateX(30px) scale(0.98)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(0px) scale(1)'
        }
    },
    loginCard: {
        animation: '$slideLeft ease-in 0.3s',
        boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
        background: theme.background.paper,
        color: theme.text.primary,
        width: '100%',
        margin: "4%",
        padding: '2rem',
        position: 'relative'
    },
    forgotPassLink: {
        color: theme.text.activeLink,
        textDecoration: 'none',
        fontSize: '0.9em',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    cardHeader: {
        color: theme.text.activeLink,
        fontWeight: 600,
        fontSize: '1.6em',
        marginBottom: "2rem"
    }
});

const buttonStyles = theme => ({
    buttonMain: {
        width: (props) => props.fullWidth ? '100%' : 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '.5rem',
        paddingBottom: '.5rem',
        background: (props) => {
            if (props.color) return theme.colors[props.color];
            return theme.colors.primary;
        },
        borderRadius: '.5rem',
        border: 'none',
        color: '#fff',
        fontFamily: 'inherit',
        outline: 'none',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(90%)'
        },
        '&:focus': {
            boxShadow: (props) => {
                if (props.color) return `0 0 0 3px ${theme.colors[props.color] + '42'}`;
                return `0 0 0 3px ${theme.colors.primary + '42'}`;
            },
            outlineColor: 'rgba(0,0,0,0)',
            outlineOffset: '2px',
            outlineStyle: 'solid',
            borderColor: theme.colors.primary
        }
    },
    iconLeft: {
        marginRight: '.5rem',
        display: 'flex',
        alignItems: 'center'
    }
});

const inputStyles = theme => ({
    inputMain: {
        color: theme.text.input,
        fontSize: '.875rem',
        padding: '.5rem .75rem',
        lineHeight: '1.5',
        display: 'block',
        borderRadius: '.25rem',
        outline: 'none',
        backgroundColor: theme.background.input,
        border: `1px solid ${theme.border.input}`,
        width: '100%',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        marginTop: '.5rem',
        '&:focus': {
            boxShadow: `0 0 0 3px ${theme.colors.primary + '42'}`,
            outlineColor: 'rgba(0,0,0,0)',
            outlineOffset: '2px',
            outlineStyle: 'solid',
            borderColor: theme.colors.primary
        }
    },
    inputWrapper: {
        display: 'flex'
    },
    checkbox: {
        marginRight: '.5rem',
        appearance: 'none',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '17px',
        width: '17px',
        padding: 0,
        '&:focus': {
            boxShadow: `0 0 0 3px ${theme.colors.primary + '42'}`,
            outlineColor: 'rgba(0,0,0,0)',
            outlineOffset: '2px',
            outlineStyle: 'solid',
            borderColor: theme.colors.primary
        },
        '&:checked': {
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L7 8.586 5.707 7.293z'/%3E%3C/svg%3E")`,
            backgroundColor: theme.colors.primary,
            borderColor: 'transparent',
            backgroundSize: '100% 100%',
            backgroundPosition: '50%',
            backgroundRepeat: 'no-repeat',
        }
    },
    inlineWrapper: {
        display: 'inline-block'
    }
});

const registrationPageStyles = theme => ({
    '@keyframes slideRight': {
        from: {
            opacity: 0,
            transform: 'translateX(-30px) scale(0.98)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(0px) scale(1)'
        }
    },
    loginCard: {
        animation: '$slideRight ease-in 0.3s',
        boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
        background: theme.background.paper,
        color: theme.text.primary,
        width: '100%',
        margin: "2%",
        padding: '2rem',
        position: 'relative'
    },
    cardHeader: {
        color: theme.text.activeLink,
        fontWeight: 600,
        fontSize: '1.6em',
        marginBottom: "1rem"
    }
});

const labelStyles = theme => ({
    label: {
        fontSize: '.875rem',
        display: 'block',
        marginBottom: '1rem',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        '& input': {
            marginTop: '.25rem',
        },
    },
});

const alertStyles = theme => ({
    '@keyframes slideRight': {
        from: {
            opacity: 0,
            transform: 'translateX(-10px) scale(0.98)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(0px) scale(1)'
        }
    },
    alert: {
        animation: '$slideRight ease-in 0.3s',
        padding: '20px',
        background: (props) => {
            if (!props.type) return theme.alert.error;
            if (props.type === 'success') return theme.alert.success;
        },
        borderLeft: (props) => {
            if (!props.type) return '5px solid #FFB3C0';
            if (props.type === 'success') return '5px solid #A7F3D0';
        },
        borderRadius: '4px',
        fontSize: '.875rem',
        margin: '10px 0px',
        color: theme.text.primary
    },
    success: {
        background: '#fafffa',
        borderLeft: '5px solid #d4ffb3'
    },
    title: {
        fontWeight: 700
    },
    link: {
        cursor: 'pointer'
    }
});

/*============================ STYLES END ==============================*/
const CustomThemeContext = createContext();

const getCurrentTheme = () => {
    //fancy-form: {theme: 'light'}
    let currentSettings;
    try {
        currentSettings = JSON.parse(localStorage.getItem('fancy-form'));
    } catch (e) {
        currentSettings = { theme: 'light' };
        localStorage.setItem('fancy-form', JSON.stringify(currentSettings));
    }

    if (!currentSettings || !currentSettings.theme) {
        currentSettings = { theme: 'light' };
        localStorage.setItem('fancy-form', JSON.stringify(currentSettings));
    }

    return currentSettings.theme;
}

const CustomThemeProvider = props => {
    const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

    const toggleTheme = () => {
        let newValue = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newValue);
        localStorage.setItem('fancy-form', JSON.stringify({ theme: newValue }));
    }

    const themeData = { currentTheme, toggleTheme };
    return (
        <CustomThemeContext.Provider value={themeData}>
            <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
                {props.children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

function LoginLayout(props) {
    const classes = props.classes;

    return <div className={classes.loginLayout}>
        {props.children}
    </div>
}
LoginLayout = withStyles(loginLayoutStyles)(LoginLayout);

function Divider(props) {
    return <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ height: '1px', width: '100%', background: '#d1d5db' }}></div>
        <p style={{ margin: '10px', fontWeight: 100, color: '#94979c' }}>OR</p>
        <div style={{ height: '1px', width: '100%', background: '#d1d5db' }}></div>
    </div>
}

function Alert(props) {
    const classes = props.classes;
    return <>
        <div className={classes.alert}>
            <summary className={classes.title}>{props.title}</summary>
            {props.children}
        </div>
    </>
}
Alert = withStyles(alertStyles)(Alert);

function Label(props) {
    const classes = props.classes;
    return (
        <label className={classes.label}>
            {props.children}
        </label>
    );
}
Label = withStyles(labelStyles)(Label);

function Button(props) {
    const classes = props.classes;
    return <button
        className={classes.buttonMain}
        onClick={props.onClick}
        type={props.type}
    >
        {props.iconLeft ? <span className={classes.iconLeft}>{props.iconLeft}</span> : ''}
        {props.children}
    </button>
}
Button = withStyles(buttonStyles)(Button);

function Input(props) {
    const classes = props.classes;
    return <div className={classes.inputWrapper + (props.type === 'checkbox' ? ' ' + classes.inlineWrapper : '')}>
        <input
            className={classes.inputMain + (props.type === 'checkbox' ? ' ' + classes.checkbox : '')}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            checked={props.value}
            type={props.type}
            style={{ ...props.style }}
        >
        </input>
    </div>
}
Input = withStyles(inputStyles)(Input);


function RegistrationPage(props) {
    const classes = props.classes;
    const [response, setResponse] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    const backToLogin = () => {
        props.openLogin(true);
    }

    const emailValidate = (value) => {
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (!emailRegex.test(value)) return 'Wrong email';
        return undefined;
    }

    const passwordValidate = (value) => {
        if (!value || value.length < 6) return 'Passwords: atleast 6 characters required';
        return undefined;
    }

    const repeatValidate = (val1, val2) => !val1 || val2 !== val1 ? 'Password mismatch' : undefined;

    const registrationSubmitHandler = async (e) => {
        e.preventDefault();
        console.log('registration sumbmit handler');

        let errors = [];
        let emailCheck = emailValidate(email);
        if (emailCheck) errors.push(emailCheck);

        let passwordCheck = passwordValidate(password);
        if (passwordCheck) errors.push(passwordCheck);

        let repeatCheck = repeatValidate(password, repeatPassword);
        if (repeatCheck) errors.push(repeatCheck);

        setFormErrors(errors);
        if (!errors.length) {
            try {
                //handle sever logic
                await handleRegister({email:email,password:password});
                setResponse('Successfully registered!');
            } catch (error) {
                console.error(error);
                alert(error.error);
            }
        }
    }

    return <div className={classes.loginCard}>

        <h1 className={classes.cardHeader}>Sign Up</h1>

        {!response ? <div className="form">

            <form onSubmit={registrationSubmitHandler}>

                {formErrors.length ? <Alert title="Registration failed">
                    {formErrors.map(err => <div>{err}</div>)}
                </Alert> : ''}

                <div>
                    <Label>
                        <span>Email</span>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Label>
                </div>

                <div>
                    <Label>
                        <span>Password</span>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Label>
                </div>

                <div>
                    <Label>
                        <span>Repeat password</span>
                        <Input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                    </Label>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <Button type='submit' onClick={registrationSubmitHandler} fullWidth>Create account</Button>
                    <Divider />
                </div>

            </form>

        </div> : <Alert type="success" title="Successfully registered!"></Alert>
        }

        <Button fullWidth onClick={backToLogin} color="green" iconLeft={<FaArrowLeft />}>Back to log in</Button>

    </div>
}
RegistrationPage = withStyles(registrationPageStyles)(RegistrationPage);


function LoginPage(props) {
    const dispatch = useDispatch();
    const classes = props.classes;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState([]);
    const [isSuccessed, setSuccess] = useState(false);

    const redirectToRegistration = () => {
        props.openLogin(false);
    }

    const emailValidate = (value) => {
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (!emailRegex.test(value)) return 'Wrong email';
        return undefined;
    }

    const passwordValidate = (value) => {
        if (!value || value.length < 6) return 'Password must be more than 6 characters';
        return undefined;
    }


    const loginSubmitHandler = async (e) => {
        console.log("login Submit Handler")
        e.preventDefault();

        let errors = [];
        let emailCheck = emailValidate(email);
        if (emailCheck) errors.push(emailCheck);

        let passwordCheck = passwordValidate(password);
        if (passwordCheck) errors.push(passwordCheck);
        setFormErrors(errors);
        if (!errors.length) {
            try {
                //handle sever logic
                await handleLogin({email:email,password:password});
                setSuccess(true)
                dispatch(setUserAuth());
            } catch (error) {
                console.error(error);
                alert(error.error);
            }
        };
    }

    return <div className={classes.loginCard}>

        <h1 className={classes.cardHeader}>Log in</h1>

        <div className="form">

            <form onSubmit={loginSubmitHandler}>

                {formErrors.length ? <Alert title="Failed to login">
                    {formErrors.map(err => <div>{err}</div>)}
                </Alert> : ''}

                {isSuccessed ? <Alert type="success" title="Successfully Logged in"></Alert> : ''}

                <div name="email" validate={emailValidate}>
                    <Label>
                        <span>Email</span>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Label>
                </div>

                <div name="password" validate={passwordValidate}>
                    <Label>
                        <span>Password</span>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Label>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <Button type='submit' onClick={loginSubmitHandler} fullWidth>Log in</Button>
                </div>

            </form>

        </div>

        <Divider />
        <Button fullWidth onClick={redirectToRegistration} color="green" iconLeft={<FaPlusCircle />}>Create account</Button>

    </div>
}
LoginPage = withStyles(loginPageStyles)(LoginPage);

const Form = (props) => {
    return (
        <CustomThemeProvider>
            <LoginLayout>
                {
                    props.loginOpen ? <LoginPage openLogin={props.setLoginOpen} /> : <RegistrationPage openLogin={props.setLoginOpen} />
                }
            </LoginLayout>
        </CustomThemeProvider>
    )
}

export default Form
