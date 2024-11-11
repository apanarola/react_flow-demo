import React from 'react'
import { Form } from 'react-bootstrap'

const PrepareData = ({
    formData = {},
    handleChange = () => {},
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

            <Form.Group controlId="query">
                <Form.Label>Query</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Enter your query here"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    isInvalid={!!errors.query}
                />
                <Form.Control.Feedback type="invalid">{errors.query}</Form.Control.Feedback>
            </Form.Group>
        </>
    )
}

export default PrepareData