import { useEffect } from "react";
import { connect } from "react-redux";

import { getLeadsRequest } from "../redux/actions";


const App = ({ leads, getLeads }) => {

    useEffect(() => {
        getLeads();
    }, []);

    return (
        <>
            Hello world!
        </>
    );
}

const mapStateToProps = (state) => ({
    leads: state.leads,
});

const mapDispatchToProps = (dispatch) => ({
    getLeads: (data) => dispatch(getLeadsRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);