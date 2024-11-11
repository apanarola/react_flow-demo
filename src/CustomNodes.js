import React from "react";
import { Handle } from "react-flow-renderer";
import { Container, Row, Col } from "react-bootstrap";

const CustomNode = ({ data, handles }) => (
	<Container className="my-4">
		<div
			className="border border-dark"
			style={{ height: "80px", width: "170px", position: "relative", borderRadius: "6px" }}
		>
			<Row className="align-items-center" style={{ height: "50%" }}>
				<Col className="d-flex align-items-center gap-2" style={{ padding: "8px 20px" }}>
					{data.icon && <img src={data.icon} alt={data.title} />}
					<span className="title-text flex-grow fw-bold">{data.category}</span>
				</Col>
			</Row>
			<div
				className="position-absolute"
				style={{ top: "50%", left: "0", width: "100%", borderTop: "1px solid black" }}
			/>
			<Row className="align-items-center" style={{ height: "50%" }}>
				<Col className="category-text fw-light" style={{ padding: "8px 20px" }}>
					{data.category}
				</Col>
			</Row>
			{handles.map((handle, index) => (
				<Handle key={index} type={handle.type} position={handle.position} id={handle.id} style={handle.style} />
			))}
		</div>
	</Container>
);

export const customSourceNode = (props) => (
	<CustomNode {...props} handles={[{ type: "source", position: "right", id: "a", style: handleStyle }]} />
);

export const customTargetNode = (props) => (
	<CustomNode {...props} handles={[{ type: "target", position: "left", id: "a", style: handleStyle }]} />
);

export const customBidirectionalNode = (props) => (
	<CustomNode
		{...props}
		handles={[
			{ type: "source", position: "right", id: "a", style: handleStyle },
			{ type: "target", position: "left", id: "a", style: handleStyle },
		]}
	/>
);

const handleStyle = { top: "50%", background: "#333", height: "7px", width: "7px" };