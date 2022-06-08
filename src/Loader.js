import React from "react";
import {useSelector} from 'react-redux';
import { Spinner } from 'reactstrap';
 

const Loader = (props) => {
    
    const [displayLoading,setDisplayLoading] = React.useState("dnoneLoading");

    const state=useSelector(state=>state);
 
    return (
        <div style={{zIndex:"99999999"}}  className={state.loading ? "loadingOverlay" : "dnoneLoading"}>
        <Spinner  style={{ width: '3rem', height: '3rem' }} type="grow" />
        </div>
    )


}
 

export default Loader;
