import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
	addEdge,
	Background,
	Controls,
	useNodesState,
	useEdgesState,
} from "react-flow-renderer";
import DialogBox from "../common/DialogBox";
import { CAN_SINGLE_ENTRY, chartConstants, formAccessProperty, SIDEBAR_DATA } from "../../utils/constants";
import { nodeTypes } from "../../utils/nodeTypes";
import Sidebar from "../../components/layout/Sidebar";
import RenderForm from "../RenderForm";
import formData from "../../utils/formdata.json";

const DiagramBuilder = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [modalStack, setModalStack] = useState([]);
	const [allNodesConfigData, setAllNodesConfigData] = useState({});

	const handleCloseModal = () => {
		setModalStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
	};

	const onSubmit = (values, identifier) => {
		setAllNodesConfigData((prev) => ({
			...prev,
			[identifier]: values
		}));
		handleCloseModal();
	};

	const handleShowNestedFormModal = (item, index) => {
		setModalStack((prevStack) => [...prevStack, { index, ...item }]);
	};

	const onAddNode = (data, node, position) => {
		let count = 1;
		if (node.identifier === "dashboardView") {
			const dashboardView = nodes.filter(
				(node) => node.data.identifier === node.identifier
			);
			count = dashboardView.length > 0 ? dashboardView.length + 1 : 1;
		}
		// const newNode = {
		// 	id: `${data.title}-${nodes.length + 1}`,
		// 	position,
		// 	data: {
		// 		title: data.title,
		// 		icon: data.icon,
		// 		category: CAN_SINGLE_ENTRY.includes(node.title)
		// 			? node.title
		// 			: `${node.title} ${count}`,
		// 		identifier: node.identifier,
		// 	},
		// 	type: node.type,
		// };

		const newNode = {
			id: `${node.identifier}_${nodes.length + 1}`,
			position,
			data: {
				...node,
				parentNodeTitle: data.title,
				icon: data.icon,
				category: CAN_SINGLE_ENTRY.includes(node.title)
					? node.title
					: `${node.title} ${count}`,
			},
			type: node.type,

		};
		setNodes((nds) => [...nds, newNode]);
	};

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[]
	);

	const onDragOver = (event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	};

	const onDrop = (event) => {
		event.preventDefault();
		const { data, node } = JSON.parse(
			event.dataTransfer.getData("application/reactflow")
		);
		console.log(JSON.parse(
			event.dataTransfer.getData("application/reactflow")
		))
		const position = { x: event.clientX - 100, y: event.clientY - 50 };
		onAddNode(data, node, position);
	};

	const onNodeClick = (event, node) => {
		console.log('node = ', node);
		setModalStack((prevStack) => [
			...prevStack,
			node,
		]);
	};

	useEffect(() => {
		console.log('allNodesConfigData = ', allNodesConfigData)

	}, [allNodesConfigData])


	const onEdgeClick = (event, edge) => {
	};

	const onDeleteNode = (deleteNode) => {
		const updatedNodes = nodes.filter((node) => node.id !== deleteNode.id);
		handleCloseModal();
		setNodes(updatedNodes);
	};

	const onCloneNode = (cloneNode) => {
		const nodeToClone = nodes.find((node) => node.id === cloneNode.id);
		if (nodeToClone) {
			const offset = 20;
			const newNode = {
				...nodeToClone,
				id: `${nodeToClone.data.title}-${nodes.length + 1}`,
				position: {
					x: nodeToClone.position.x + offset,
					y: nodeToClone.position.y + offset,
				},
				selected: false,
			};
			setNodes((prevNodes) => [...prevNodes, newNode]);
		}
		handleCloseModal();
	};

	const getFormSchema = (index, identifier) => {
		return formData[identifier];
		if (index === 0) {
			return formData[modalStack[0].data.identifier]
		}
		const currentModal = modalStack[index];
		if (currentModal?.data?.identifier === formAccessProperty.TABLE_VIEW) {
			return formData[formAccessProperty.NESTED_TABLE];
		} else {
			const nestedDashboardTitle = currentModal?.name;
			if (nestedDashboardTitle === chartConstants.donut) {
				return formData[formAccessProperty.NESTED_DASHBOARD_DONUT_CHART];
			} else if (nestedDashboardTitle === chartConstants.bar) {
				return formData[formAccessProperty.NESTED_DASHBOARD_BAR_CHART];
			} else if (nestedDashboardTitle === chartConstants.table) {
				return formData[formAccessProperty.NESTED_DASHBOARD_DATA_TABLE];
			} else {
				return formData[formAccessProperty.NESTED_TABLE];
			}
		}
	};

	return (
		<div className="diagram-builder">
			<Sidebar
				sidebarData={SIDEBAR_DATA}
				onDragStart={(event, { data, node }) => {
					event.dataTransfer.setData(
						"application/reactflow",
						JSON.stringify({ data, node })
					);
					event.dataTransfer.effectAllowed = "move";
				}}
			/>
			<div
				className="reactflow-wrapper"
				onDrop={onDrop}
				onDragOver={onDragOver}
			>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					onNodeClick={onNodeClick}
					onEdgeClick={onEdgeClick}
					style={{ width: "100%", height: "100vh" }}
				>
					<Controls />
					<Background />
				</ReactFlow>
			</div>

			{modalStack.length > 0 &&
				modalStack.map((modal, index) => {
					const nodeIdentifier =  modal?.data?.identifier
					return (
						<DialogBox
							key={index}
							show={modal}
							handleClose={handleCloseModal}
							onDeleteNode={onDeleteNode}
							onCloneNode={onCloneNode}
							hideActionButtons={index >= 1}
							hideCloseButton={index >= 1}
							hideTitle={index >= 1}
							disableBackdrop={index >= 1}
							FormComp={
								<RenderForm
									nodeData={allNodesConfigData[modal?.id] || {}}
									identifier={nodeIdentifier}
									nodeId={modal?.id}
									schema={getFormSchema(index, nodeIdentifier)}
									onSubmit={onSubmit}
									handleShowNestedFormModal={handleShowNestedFormModal}
								/>
							}
						/>
					)
				})}
		</div>
	);
};

export default DiagramBuilder;
