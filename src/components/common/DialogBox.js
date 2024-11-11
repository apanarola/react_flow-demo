import React from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from "react-bootstrap";

import copyIcon from "../../assets/images/svg/copyIcon.svg";
import trashIcon from "../../assets/images/svg/trashIcon.svg";
import menuIcon from "../../assets/images/svg/menuIcon.svg";
import backArrowIcon from "../../assets/images/svg/backArrow.svg";
import { chartConstants } from "../../utils/constants";

function DialogBox({
	show = {},
	FormComp = <></>,
	handleClose = () => { },
	onDeleteNode = () => { },
	onCloneNode = () => { },
	hideActionButtons = false,
	hideCloseButton = false,
	hideTitle = false,
	disableBackdrop = false
}) {
	return (
		<Offcanvas
			show={!!show}
			onHide={handleClose}
			placement="end"
			backdrop={!disableBackdrop}
		>
			<Offcanvas.Header closeButton={!hideCloseButton}>
				{!hideTitle
					? <Offcanvas.Title>
						<div className="header">
							<div>
								<h5 className="title">{show.data.category}</h5>
								<p className="subtitle">{show.data.title}</p>
							</div>
						</div>
					</Offcanvas.Title>
					: <Button
						variant="link"
						size="sm"
						onClick={handleClose}
						className="p-0"
					><img src={backArrowIcon} alt={"back"} /></Button>
				}
			</Offcanvas.Header>
			<Offcanvas.Body>
				{
					hideTitle && <h5 className="title mb-4">
						{Object.values(chartConstants).includes(show.name)
							? `${show.index + 1}. ${show.name} `
							: `Column ${show.index + 1}`}
					</h5>
				}
				{!hideActionButtons && <div className="button-group">
					<button className="icon-button" onClick={() => onCloneNode(show)}>
						<img alt="copyIcon" src={copyIcon} />
					</button>
					<button className="icon-button" onClick={() => onDeleteNode(show)}>
						<img alt="trashIcon" src={trashIcon} />
					</button>
					<div className="more-options">
						<img src={menuIcon} alt="menuIcon" />
					</div>
				</div>}
				{FormComp}
			</Offcanvas.Body>
		</Offcanvas>
	);
}

export default DialogBox;
