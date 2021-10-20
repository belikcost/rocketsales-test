import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import debounce from 'lodash.debounce';

import { Box, CircularProgress, Container, Paper, TextField, Typography } from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BlockIcon from '@material-ui/icons/Block';

import { getLeadsRequest } from "../redux/actions";
import { Leads } from "../components/Leads";

import './App.css';


const App = ({ leads, leadsLoad, leadsFail, getLeads }) => {
    const [searchString, setSearchString] = useState('');

    const debouncedGetLeads = useCallback(debounce(getLeads, 500), []);

    const onChange = (e) => {
        const value = e.target.value;
        setSearchString(value);

        if (value.length >= 3) {
            debouncedGetLeads(value);
        }
    }

    useEffect(() => {
        getLeads();
    }, []);

    const PaperInBox = ({children}) => (
        <Box className="app_box">
            <Paper className="app_paper" variant="outlined">
                {children}
            </Paper>
        </Box>
    )

    return (
        <Container>
            <div className="app__search">
                <TextField
                    value={searchString}
                    onChange={onChange}
                    label="Search"
                    type="search"
                />
            </div>
            {!leadsLoad ? (
                <>
                    {!leadsFail ? (
                        <>
                            {leads.length !== 0 ? (
                                <Leads leads={leads}/>
                            ) : (
                                <PaperInBox>
                                    <BlockIcon/>
                                    <Typography>Empty leads</Typography>
                                </PaperInBox>
                            )}
                        </>
                    ) : (
                        <PaperInBox>
                            <ErrorOutlineIcon/>
                            <Typography>Request failed</Typography>
                        </PaperInBox>
                    )}
                </>
            ) : (
                <Box className="app_box">
                    <CircularProgress size={20}/>
                </Box>
            )}
        </Container>
    );
}

const mapStateToProps = (state) => ({
    leads: state.leads,
    leadsFail: state.leadsFail,
    leadsLoad: state.leadsLoad
});

const mapDispatchToProps = (dispatch) => ({
    getLeads: (data) => dispatch(getLeadsRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);