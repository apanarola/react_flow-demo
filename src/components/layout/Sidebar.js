// Sidebar.js
import React from "react";
import { Accordion } from "react-bootstrap";
import dotGrid from "../../assets/images/svg/dots-grid.svg";
import sidebarHeaderIcon from "../../assets/images/svg/sidebarHeaderIcon.svg";

const Sidebar = ({ sidebarData, onDragStart }) => {
	return (
		<aside className="sidebar">
			<div className="d-flex align-items-center gap-3">
				<div>
					<img src={sidebarHeaderIcon} alt="headerIcon" />
				</div>
				<div className="d-flex flex-column ">
					<p className="fw-semibold m-0 fs-4">Library</p>
				</div>
			</div>
			<div className="pb-3 pt-1 text-start fw-light">
				<span>Drag an item onto the canvas to build.</span>
			</div>
			<Accordion defaultActiveKey="0">
				{sidebarData?.map((data, index) => (
					<Accordion.Item key={index} eventKey={data.id}>
						<Accordion.Header>
							<div className="d-flex gap-2 align-items-center">
								<div>
									<img src={data.icon} alt={data.title} />
								</div>
								<div>
									<p className="m-0 fw-bold">{data.title}</p>
								</div>
							</div>
						</Accordion.Header>
						<Accordion.Body>
							{data.nodes.map((node, nodeIndex) => (
								<div
									key={'node_' + index + '_' + nodeIndex}
									className="d-flex justify-content-between nodes-card"
									draggable
									onDragStart={(event) =>
										onDragStart(event, { data, node })
									}
								>
									<p className="m-0">{node.title}</p>
									<img src={dotGrid} alt="dotgrid" />
								</div>
							))}
						</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
		</aside>
	);
};

export default Sidebar;