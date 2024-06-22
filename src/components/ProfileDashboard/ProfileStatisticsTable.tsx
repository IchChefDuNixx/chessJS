import { Table, TableBody, TableCell, TableRow } from '@mui/material';

import { ProfileData, ProfileStatistics } from './ProfileDashboard';


interface Props {
    profileData: ProfileData,
    profileStatistics: ProfileStatistics
}

function ProfileStatisticsTable({ profileData, profileStatistics } : Props) {

	const tableCellSx = { borderBottom: "none", paddingBottom: 0, paddingTop: 0, width: "50%" }

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell sx={ tableCellSx } align="right"> Registered: </TableCell>
                    <TableCell sx={ tableCellSx } align="left">{new Date(profileData.registered).toLocaleDateString()}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={ tableCellSx } align="right"> Games played: </TableCell>
                    <TableCell sx={ tableCellSx } align="left">{profileStatistics.games_played}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={ tableCellSx } align="right"> Games won: </TableCell>
                    <TableCell sx={ tableCellSx } align="left">{`${profileStatistics.games_won} (${profileStatistics.winrate}%)`}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default ProfileStatisticsTable;
