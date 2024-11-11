import React, { useState } from 'react';
import { Form, Button, Row, Col, FormControl, FormSelect } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import navigaterightarow from "../../src/assets/images/svg/navigateRight.svg"
import checkmark from "../../src/assets/images/svg/checkmark.svg"
import uncheckmark from "../../src/assets/images/svg/uncheckmark.svg"

const RenderForm = ({ nodeData, nodeId, schema, onSubmit, handleShowNestedFormModal }) => {
  const { handleSubmit, register, formState: { errors } } = useForm({values: nodeData });
  const [checkedItems, setCheckedItems] = useState({});
  const handleToggleCheck = (itemName) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const renderHelperText = (helperText) => (
    helperText ? <Form.Text className="text-muted">{helperText}</Form.Text> : null
  );

  const renderField = (field) => {
    const isRequired = field.required;

    const renderLabel = (fieldName) => (
      <Form.Label>
        {fieldName} {isRequired && <span style={{ color: 'red' }}>*</span>}
      </Form.Label>
    );

    switch (field.type) {
      case 'text':
      case 'textarea':
        return (
          <Form.Group controlId={field.name} key={field.name} className="mb-3">
            {renderLabel(field.name)}
            <FormControl
              {...register(field.name, { required: isRequired })}
              as={field.type === 'textarea' ? 'textarea' : 'input'}
              rows={field.rows || 1}
              placeholder={field.placeholder}
              isInvalid={errors[field.name]}
            />
            {renderHelperText(field.helperText)}
            <Form.Control.Feedback type="invalid">
              {isRequired && 'This field is required'}
            </Form.Control.Feedback>
          </Form.Group>
        );
      case 'select':
        return (
          <Form.Group controlId={field.name} key={field.name} className="mb-3">
            {renderLabel(field.name)}
            <FormSelect
              {...register(field.name, { required: isRequired })}
              isInvalid={errors[field.name]}
            >
              <option value="">{field.placeholder}</option>
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
            {renderHelperText(field.helperText)}
            <Form.Control.Feedback type="invalid">
              {isRequired && 'This field is required'}
            </Form.Control.Feedback>
          </Form.Group>
        );
      case 'custom_checkbox':
        return (
          <Form.Group controlId={field.name} key={field.name} className="mb-3 listing">
            {renderLabel(field.placeholder)}
            <div className="list">
              {field.options.map((option, idx) => (
                <Row
                  key={idx}
                  className="d-flex align-items-center list-item cursor-pointer"
                  onClick={() => handleToggleCheck(option.name)}
                >
                  <Col xs={8}><p className="fw-semibold mb-0">{option.name}</p></Col>
                  <Col xs={4} className="text-end">
                    <Button
                      variant={"link"}
                      size="sm"
                    >
                      <img
                        src={checkedItems[option.name] ? uncheckmark : checkmark}
                        alt={checkedItems[option.name] ? "uncheck" : "check"}
                      />
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>
          </Form.Group>
        );
      case 'navigate':
        return (
          <Form.Group
            controlId={field.name}
            key={field.name} className="mb-3 mt-4"
          >
            {renderLabel(field.name)}
            <div className="list">
              {field.list.map((item, idx) => (
                <Row key={idx}
                  className="d-flex align-items-center list-item cursor-pointer"
                  onClick={() => handleShowNestedFormModal(item, idx)}
                >
                  <Col xs={8}>
                    <p className="fw-semibold mb-0"> {item?.isBullet ? `${idx + 1}. ${item.name}` : item.name}</p>
                  </Col>
                  <Col xs={4} className="text-end">
                    <Button
                      variant="link"
                      size="sm"

                    >
                      <img src={navigaterightarow} alt="navigateright" />
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>
          </Form.Group>
        );
      default:
        return null;
    }
  };

  return (
    <Form onSubmit={handleSubmit((values) => onSubmit(values, nodeId))}>
      {schema.fields.map(renderField)}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RenderForm;
