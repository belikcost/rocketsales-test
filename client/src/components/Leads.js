import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { Lead } from "./Lead";

import './Leads.css';


export const Leads = ({ leads }) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell className="leads_bold">Название</TableCell>
                        <TableCell className="leads_bold">Статус</TableCell>
                        <TableCell className="leads_bold">Ответственный</TableCell>
                        <TableCell className="leads_bold">Дата создания</TableCell>
                        <TableCell className="leads_bold">Бюджет</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leads.map(lead => (
                        <Lead lead={lead} key={lead.id}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}