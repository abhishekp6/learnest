import React from "react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./component/Landingpage";

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
    }
}

export default App;