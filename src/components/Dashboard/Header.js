import React from "react";
import Swal from "sweetalert2";
import Logout from "../Logout";

const Header = ({ setIsAdding, setIsAuthenticated}) => {

    return(
        <header>
            <h1>Employee Software Management</h1>
            <div style={{marginTop:'30px', marginBottom:'30px'}}>
                <button onClick={() =>{setIsAdding(true)}}>Add Employee</button>
                <Logout setIsAuthenticated={setIsAuthenticated}/>
            </div>
        </header>
    )
}

export default Header;