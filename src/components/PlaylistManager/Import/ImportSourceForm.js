import * as React from 'react';

import Form from '../../Form';
import FormGroup from '../../Form/Group';

const ImportSourceForm = ({
  sourceType, title,
  children,
  onImport
}) => (
  <div className="PlaylistImport-source">
    <Form onSubmit={onImport}>
      <FormGroup>
        <img
          alt={title}
          title={title}
          src={`assets/img/${sourceType}.png`}
          style={{
            maxWidth: '100%',
            maxHeight: 50,
            display: 'block',
            margin: 'auto'
          }}
        />
      </FormGroup>
      {children}
    </Form>
  </div>
);

export default ImportSourceForm;
