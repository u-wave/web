import React from 'react';
import PropTypes from 'prop-types';
import SchemaForm from 'react-jsonschema-form'; // eslint-disable-line

const ServerConfig = ({
  configSchema,
}) => (
  <div>
    {configSchema ? (
      <SchemaForm
        schema={configSchema}
      />
    ) : (
      <p>
        Loading
      </p>
    )}
  </div>
);

ServerConfig.propTypes = {
  configSchema: PropTypes.object,
};

export default ServerConfig;
