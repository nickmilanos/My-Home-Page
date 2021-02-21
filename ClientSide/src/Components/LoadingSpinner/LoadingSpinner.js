import React from 'react';

export const LoadingSpinner = () => {
    return(
        <div className="popupWrapper">
            <div className="loadingSpinnerWrapper">
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
        </div>
    );
}