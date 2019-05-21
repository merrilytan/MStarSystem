import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from 'react-router-dom';
import HomeCreate from './homes/HomeCreate';
import HomeEdit from './homes/HomeEdit';
import HomeDelete from './homes/HomeDelete';
import HomeList from './homes/HomeList';
import HomeShow from './homes/HomeShow';
import Header from './Header';

const App = () => {
    return (
        <div>
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
        </div>
    );
}

export default App;