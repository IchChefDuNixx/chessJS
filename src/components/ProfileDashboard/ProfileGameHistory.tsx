import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ProfileData } from "./ProfileDashboard";


interface Props {
    profileData: ProfileData
}

const columns: GridColDef[] = [
	{ field: 'timestamp', headerName: 'Timestamp', type: "string",
		valueGetter: (value: string): Date => new Date(value),
		valueFormatter: (value: Date) => value.toLocaleString()
	},
	{ field: 'opponent', headerName: 'Opponent', type: "string"},
	{ field: 'victory', headerName: 'Victory', type: "boolean"},
];

function ProfileGameHistory({ profileData } : Props) {
    return(
        <DataGrid
            rows={profileData.play_history}
            columns={columns}
            density="compact"
            autosizeOnMount
            hideFooterSelectedRowCount
            sx={{ paddingLeft: 2, paddingRight: 2 }}
        />
    );
}

export default ProfileGameHistory;