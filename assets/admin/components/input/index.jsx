import { __experimentalInputControl as InputControl, SelectControl } from '@wordpress/components';
import { useState } from 'react';
// import { useState } from '@wordpress/element';

export const CustomSelectControl = ({ labelName, initalValue, options  }) => {
  const [ value, setValue ] = useState( initalValue );

  return (
    <SelectControl
      label={ labelName || "{{ No Label Added }}" }
      value={ value }
      options={ options }
      onChange={ setValue }
    />
  );
};

export const InputWithSideLabel = ({ initialValue, labelName, isConfidential }) => {
   const isHidden = isConfidential || false;
   const [ value, setValue ] = useState( initialValue );
   return (
      <InputControl
         __unstableInputWidth="3em"
         label={ labelName || '{{label_name}}'}
         value={ value }
         type={ (isHidden)? 'password' : 'text' }
         labelPosition="edge"
         onChange={( nextValue ) => setValue( nextValue ?? '' )}
      />
   )
}

const Input = ({ initialValue, labelName, isConfidential }) => {
  const isHidden = isConfidential || false;
  const [ value, setValue ] = useState( initialValue );

  return (
     <InputControl
        label={ labelName || '{{label_name}}'}
        value={ value }
        type={ (isHidden)? 'password' : 'text' }
        onChange={ ( nextValue ) => setValue( nextValue ?? '' ) }
     />
  );
};

export default Input;