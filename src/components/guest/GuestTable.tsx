import { MoreHorizRounded } from "@mui/icons-material";
import { guests } from "../../services/guests";
import GenericTable from "../Table/GenericTable";

function GuestTable() {
	return (
		<div>
			<GenericTable tableData={guests} showActionCol={true} />
			{/* <GenericTable tableHeaderData={tableHeader} tableBodyData={tableBody} /> */}
		</div>
	);
}

export default GuestTable;
