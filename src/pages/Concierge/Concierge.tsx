function Concierge() {
	// const headers = ["All Employees", "Active Employees", "Inactive Employees"];
	// const tableheader = ["Employees Name", "Job Description", "Schedule", "Contact", "Status"];
	return (
		<div>Concierge</div>
		// <div>
		// 	<Paper className="room-header-paper">
		// 		{headers &&
		// 			headers.map((header) => (
		// 				<div key={header} className="roomHeader">
		// 					<Typography variant="h6">{header}</Typography>
		// 				</div>
		// 			))}
		// 	</Paper>

		// 	<TableContainer component={Paper} elevation={0} className="room-table-container">
		// 		<Table>
		// 			<TableHead>
		// 				<TableRow>
		// 					{tableheader.map((name) => (
		// 						<StyledTableCell>{name.toLocaleUpperCase()}</StyledTableCell>
		// 					))}
		// 				</TableRow>
		// 			</TableHead>
		// 			<TableBody>
		// 				{employeeData &&
		// 					employeeData.map(
		// 						({
		// 							name,
		// 							jobTitle,
		// 							description,
		// 							schedule,
		// 							time,
		// 							status,
		// 							contact,
		// 						}: {
		// 							name: string;
		// 							jobTitle: string;
		// 							description: string;
		// 							schedule: string;
		// 							time: string;
		// 							status: string;
		// 							contact: string;
		// 						}) => (
		// 							<StyledTableRow hover>
		// 								<TableCell>{name}</TableCell>
		// 								<TableCell>
		// 									<Typography>{jobTitle}</Typography>
		// 									<Typography variant="caption">{description}</Typography>
		// 								</TableCell>
		// 								<TableCell>
		// 									<Typography>{schedule}</Typography>
		// 									<Typography variant="caption">{time}</Typography>
		// 								</TableCell>
		// 								<TableCell>{contact}</TableCell>
		// 								<TableCell>
		// 									<Typography
		// 										className={status.toLocaleLowerCase()}
		// 										style={{
		// 											display: "grid",
		// 											placeItems: "center",
		// 											width: "70%",
		// 											borderRadius: 5,
		// 										}}
		// 									>
		// 										{status}
		// 									</Typography>
		// 									<Typography variant="caption" display="block">
		// 										{time}
		// 									</Typography>
		// 								</TableCell>
		// 							</StyledTableRow>
		// 						)
		// 					)}
		// 			</TableBody>
		// 		</Table>
		// 	</TableContainer>
		// </div>
	);
}

export default Concierge;
