import { Typography, Paper, Button } from "@mui/material";
import React from "react";

type GenericHeaderProps = {
    headerTitle: string;
};

function GenericHeader({ headerTitle }: GenericHeaderProps) {
    return (
        <div className={`staff-list-div`}>
            <div style={{}}>
                <Typography fontSize={30} fontWeight="bold">
                    {headerTitle}
                </Typography>
            </div>
            {/*
			<Paper className="room-header-paper">
                 {headers &&
					headers.map(({ name, value }) => (
						<div
							onClick={() => setSelectedHeader(value)}
							key={`${name}-${value}`}
							className={`roomHeader ${selectedHeader === value ? "header-selected" : null}`}
						>
							<Typography variant="h6">{name}</Typography>
						</div>
					))}
			</Paper>
                     */}
            {/* <Button onClick={() => setOpenModal(true)} variant="contained">
				Create Staff
			</Button> */}
        </div>
    );
}

export default GenericHeader;
