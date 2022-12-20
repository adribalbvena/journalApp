import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    //if the form has an error, we need to rerender the form
    const [formValidation, setFormValidation] = useState({

    });

    useEffect(() => {
      createValidators();
    
    }, [ formState ])

    const isFormValid = useMemo( () => {
        //to evaluate every property
        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;

    }, [ formValidation ]);
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    //takes the formValidations object and creates a new state 
    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys( formValidations )) {

            const [ fn, errorMessage = 'Required' ] = formValidations[formField];

            //to create the property (isFormValid, emailValid, etc)
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;        
        }

        setFormValidation( formCheckedValues );

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}