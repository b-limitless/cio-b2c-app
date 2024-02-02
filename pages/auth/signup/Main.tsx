

import Header from 'components/Header/Header';
import Input from 'components/Input';
import { camelCaseToNormal } from 'functions/camelCaseToNormal';
import { FormInterface, FormState } from 'interface/IAuth.interface';
import { userModel } from 'model/auth';
import dynamic from 'next/dynamic';
import FormTemplate from 'pages/order/template/form';
import React, { useReducer } from 'react';
import styles from 'style-module/shipping.module.scss'

interface IMain {
    userId: string | string[] | null;
}

const initialFormErrorState = {
    email: null,
    password: null,
    confirmPassword: null,
    agreement: null,

}
const initialState: FormState = {
    submitting: false,
    form: {
        email: '',
        password: '',
        confirmPassword: '',

    },
    formHasError: true,
    formError: {
        ...initialFormErrorState
    },
    submissionError: null,
    formSubmitted: false,
    success: null
}

function authReducer(state: FormState, action: any): FormState {
    switch (action.type) {
        case 'REGISTERING_USER':
            return { ...state, submitting: true };
        case 'USER_REGISTRATION_ERROR':
            return { ...state, submissionError: action.payload };
        case 'USER_REGISTRATION_SUCCESS':
            return { ...initialState, success: true };
        case 'UPDATE_FORM': {
            const { name, value } = action.payload;
            return {
                ...state,
                form: {
                    ...state.form,
                    [name]: value
                }
            }
        }
        case 'FORM_ERROR': {
            const { name, value, formHasError } = action.payload;
            return {
                ...state,
                formHasError,
                formError: {
                    ...state.formError,
                    [name]: value
                }
            }
        }
        case 'RESET_FORM_ERROR': {
            return {
                ...state,
                formError: {
                    ...initialFormErrorState
                }
            }
        }
        case 'FORM_SUBMITTED': {
            return {
                ...state,
                formSubmitted: action.payload
            }
        }
        case 'SUBMITTING': {
            return {
                ...state,
                submitting: action.payload
            }
        }
        default:
            return state;
    }
}


 function Main({ userId }: IMain) {

    const [{ submitting,
        form,
        submissionError,
        success,
        formError,
        formSubmitted,
        formHasError },
        dispatch] = useReducer(authReducer, initialState);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        dispatch({ type: 'UPDATE_FORM', payload: { name, value: e.target.type === 'checkbox' ? e.target.checked : value } });
    }

    const onMouseLeaveEventHandler = (name: keyof FormInterface, value: string) => {
        if (!userModel[name]?.test(value)) {
            dispatch({ type: 'FORM_ERROR', payload: { formHasError: true, name, value: `${camelCaseToNormal(name, true)} is required` } })
        } else {
            dispatch({ type: 'FORM_ERROR', payload: { name, value: null, formHasError: false } })
        }
    }

    return (
        <>
            <Header
                userId={userId ?? ''}
                showNavigation
            />
            <FormTemplate>
                <div className={styles.shipping}>
                    <div className={styles.form__row}>
                        <Input label='Email Address'
                            name='email'
                            value={form.email ?? ''}
                            onChange={onChangeHandler}
                            error={formError?.email}
                            helperText={formError?.email}
                            onBlur={() => onMouseLeaveEventHandler('email', form.email)}
                        />


                    </div>
                    <div className={styles.form__row}>
                        <Input label='Password'
                            name='password'
                            value={form.password ?? ''}
                            onChange={onChangeHandler}
                            error={formError?.password}
                            helperText={formError?.password}
                            onBlur={() => onMouseLeaveEventHandler('password', form.password)}
                        />
                    </div>
                    <div className={styles.form__row}>
                        <Input label='Confirm Password'
                            name='confirmPassword'
                            value={form.confirmPassword ?? ''}
                            onChange={onChangeHandler}
                            error={formError?.confirmPassword}
                            helperText={formError?.confirmPassword}
                            onBlur={() => onMouseLeaveEventHandler('confirmPassword', form.confirmPassword)}
                        />
                    </div> 
                     <div className={styles.form__row}></div>
                </div>
            </FormTemplate>
        </>

    )
}

export default dynamic(() => Promise.resolve(Main), { ssr: false });
