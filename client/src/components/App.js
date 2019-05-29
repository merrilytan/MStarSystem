import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import HomeCreate from './homes/HomeCreate';
import HomeEdit from './homes/HomeEdit';
import HomeDelete from './homes/HomeDelete';
import HomeList from './homes/HomeList';
import HomeShow from './homes/HomeShow';
import Header from './Header';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
        background: {
            default: '#f3f3f4',
        },
    },
    typography: {
        fontFamily: [ 'Calibri' ],
        fontWeight: 500,
        fontSize: '12px',
        color: '#676a6c',
    },
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: '11px',
            }
        },
        MuiInputLabel: {
            root: {
                backgroundColor: '#fff',
                '&$error' : {
                    color: '#e57373',
                    backgroundColor: '#ffe8e6',
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                position: 'relative',
                '& $notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: '#2196f3',
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                },
                '&$focused $notchedOutline': {
                    borderColor: '#2196f3',
                    borderWidth: 1,
                },
                '&$error $notchedOutline': {
                    borderColor: '#e57373',
                    backgroundColor: '#ffe8e6',
                },
            },
        },
        MuiFormHelperText: {
            root: {
                fontSize: '12px',
                '&$error' : {
                    color: '#fff',
                    backgroundColor: '#e57373',
                    border: '1px solid #e57373',
                    margin: '-5px 0px 10px 0px',
                    zIndex: '5',
                    color: '#fff',
                    padding: '3px 15px',
                    borderBottomLeftRadius: '4px',
                    borderBottomRightRadius: '4px',
                },
            },
        }
    }
});

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path="/" exact component={HomeList} />
                    <Route path="/homes/new" exact component={HomeCreate} />
                    <Route path="/homes/edit/:id" component={HomeEdit} />
                    <Route path="/delete" exact component={HomeDelete} />
                    <Route path="/homes/show" exact component={HomeShow} />
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;