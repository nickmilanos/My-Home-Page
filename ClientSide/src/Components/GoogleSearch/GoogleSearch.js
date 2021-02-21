import React from 'react';

export default function  GoogleSearch() {
    return(
        <div className="googleSearch">
            <form method="get" action="https://www.google.com/search">
                <input type="text" name="q" id="search" autoComplete="off" placeholder="Google Search" />
            </form>
        </div>
    );
}