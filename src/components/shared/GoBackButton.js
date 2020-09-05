import React from 'react';
import { useHistory } from 'react-router-dom';


export default function GoBackButton({ children }){
        let history = useHistory();
        return(
            <button type="button" variant="contained" style={{ marginTop: 5, marginBottom: 15, marginLeft: 30}} onClick={() => history.goBack()}>
                {children} GO BACK
            </button>
        );
}