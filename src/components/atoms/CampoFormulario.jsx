import Form from 'react-bootstrap/Form'

export default function CampoFormulario({ id, label, as = 'input', children, ...props }) {
  return (
    <Form.Group className="grupo-form" controlId={id}>
      <Form.Label>{label}</Form.Label>
      {as === 'select' ? (
        <Form.Select {...props}>{children}</Form.Select>
      ) : (
        <Form.Control as={as} {...props}>{children}</Form.Control>
      )}
    </Form.Group>
  )
}