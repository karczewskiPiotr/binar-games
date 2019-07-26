import React from "react";
import {faDiceFive} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LoadingIcon = () => {
    const renderLoadingIcon = () => {
    return(
    
        <FontAwesomeIcon icon={faDiceFive} size="3x" spin/>
    
    );  
    }   


    return(
        <div className="loading-icon">
            {renderLoadingIcon()}
        </div>
    );
};

export default LoadingIcon;

