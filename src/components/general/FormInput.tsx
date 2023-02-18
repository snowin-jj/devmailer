import { Input } from '@chakra-ui/react';
import { HTMLInputTypeAttribute, ReactPropTypes } from 'react';
import { capitalize } from '@/utils/helper';

type FormInputTypes = {
	name: string;
	type: HTMLInputTypeAttribute;
	placeholder?: string;
	w?: any;
	otherProps?: any;
};

const FormInput = ({
	name,
	type,
	placeholder,
	w,
	otherProps,
}: FormInputTypes) => {
	return (
		<Input
			type={type}
			name={name}
			placeholder={placeholder ?? capitalize(name)}
			autoComplete='off'
			borderColor='secondary'
			focusBorderColor='black'
			borderRadius='none'
			size={{ sm: 'sm' }}
			fontSize={{ sm: '0.6em', md: '0.8em' }}
			w={w}
			_hover={{ borderColor: 'none' }}
			required
			{...otherProps}
		/>
	);
};

export default FormInput;
