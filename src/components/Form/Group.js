import React from 'react';

const FormGroup = ({ children, ...props }) => {
  return (
    <div className="FormGroup" {...props}>
      {children}
    </div>
  );
};

export default FormGroup;
