import React, { useState } from "react";
import { format, fromUnixTime } from "date-fns";
import { ru } from "date-fns/locale";
import { Box, Chip, Collapse, Divider, IconButton, TableCell, TableRow, Typography } from "@material-ui/core";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import FaceIcon from '@material-ui/icons/Face';

import './Lead.css';


const formatDate = (unixTime) => format(fromUnixTime(unixTime), "d MMMM u", { locale: ru });

export const Lead = ({ lead }) => {
    const [showContacts, setShowContacts] = useState(false);

    return (
        <React.Fragment key={lead.id}>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setShowContacts(!showContacts)}>
                        {showContacts ? (
                            <KeyboardArrowDownIcon/>
                        ) : (
                            <KeyboardArrowUpIcon/>
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{lead.name}</TableCell>
                <TableCell component="th" scope="row">
                    <Chip
                        size="small"
                        label={lead.status.name}
                        style={{ backgroundColor: lead.status.color }}
                    />
                </TableCell>
                <TableCell component="th" scope="row">{lead.responsibleUser.name}</TableCell>
                <TableCell component="th" scope="row">{formatDate(lead.createdAt)}</TableCell>
                <TableCell component="th" scope="row">{lead.price} ₽</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={showContacts} timeout="auto" unmountOnExit>
                        <Box className="lead__contacts" margin={1}>
                            {lead.contacts.map((contact, i) => (
                                <div key={contact.id} className="lead-contact">
                                    <Chip
                                        label={contact.name}
                                        variant="outlined"
                                        size="small"
                                        icon={<FaceIcon/>}
                                        className="lead-contact_name"
                                    />
                                    <div>
                                        {contact.emails && contact.emails.map(email => (
                                            <a href={`mailto:${email.value}`} key={email.id}>
                                                <MailIcon fontSize="small"/>
                                            </a>
                                        ))}
                                        {contact.phones && contact.phones.map(phone => (
                                            <a href={`tel:${phone.value}`} key={phone.id}>
                                                <PhoneIcon fontSize="small"/>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}