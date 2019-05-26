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