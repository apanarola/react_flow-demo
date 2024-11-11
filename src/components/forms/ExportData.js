import React from 'react'
import { Form } from 'react-bootstrap'

const PrepareData = ({
    formData = {},
    handleChange = () => { },
    errors = {}
}) => {
    return (
        <>
            <Form.Group controlId="instanceName">
                <Form.Label>Instance name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter instance name"
                    name="instanceName"
                    value={formData.instanceName}
                    onChange={handleChange}
                    isInvalid={!!errors.instanceName}
                />
                <Form.Control.Feedback type="invalid">{errors.instanceName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="dataInput">
                <Form.Label>Data Input</Form.Label>
                <Form.Control
                    as="select"
                    name="dataInput"
                    value={formData.dataInput}
                    onChange={handleChange}
                    isInvalid={!!errors.dataInput}
                >
                    <option value="">Select data input</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.dataInput}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="fileType">
                <Form.Label>File Type</Form.Label>
                <Form.Control
                    as="select"
                    name="fileType"
                    value={formData.fileType}
                    onChange={handleChange}
                    isInvalid={!!errors.fileType}
                >
                    <option value="">Select file type</option>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                    <option value="json">JSON</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.fileType}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="recipients">
                <Form.Label>Recipients</Form.Label>
                <Form.Control
                    as="select"
                    name="recipients"
                    value={formData.recipients}
                    onChange={handleChange}
                >
                    <option value="">Select recipient</option>
                    <option value="recipient1">Recipient 1</option>
                    <option value="recipient2">Recipient 2</option>
                    <option value="recipient3">Recipient 3</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="columnsToExport">
                <Form.Label>Select columns to export</Form.Label>
                {['Column1', 'Column2', 'Column3', 'Column4', 'Column5'].map((column) => (
                    <Form.Check
                        key={column}
                        type="checkbox"
                        label={column}
                        value={column}
                        name="columnsToExport"
                        checked={formData.columnsToExport.includes(column)}
                        onChange={handleChange}
                    />
                ))}
            </Form.Group>
        </>
    )
}

export default PrepareData