

import { Button } from 'components/Button';
import Checkbox from 'components/Checkbox';
import Header from 'components/Header/Header';
import ErrorText from 'components/Help/ErrorText';
import Input from 'components/Input';
import InputAdromentSec from 'components/Input/InputAdromentSec';
import { APIS } from 'config/apis';
import { camelCaseToNormal } from 'functions/camelCaseToNormal';
import { onChangeHandler } from 'functions/onChangeHandler';
import { onSubmitHandler } from 'functions/onSubmitHandler';
import { SigninForm } from 'interface/IAuth.interface';
import { signInModel } from 'model/auth';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import FormTemplate from 'pages/order/template/form';
import { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import styles from 'style-module/shipping.module.scss';
import { request } from 'utils/request';

interface IMain {
  userId: string | string[] | null;
}

interface SigninProcess {
  form: SigninForm,
  formHasError: boolean,
  formError: SigninForm,
  submissionError: string | null;
  success: boolean;
  submitting: boolean;
  formSubmitted: boolean
}

const formIntialState: SigninForm = {
  email: '',
  password: ''
}

const signinInitialState: SigninProcess = {
  form: { email: '', password: '' },
  formHasError: false,
  formError: {
    email: '',
    password: '',
    message: ''
  },
  submissionError: null,
  success: false,
  submitting: false,
  formSubmitted: false
}

function signInProcessReducer(state: SigninProcess, action: any) {
  switch (action.type) {
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
          ...formIntialState
        }
      }
    }
    case 'SUBMITTING': {
      return {
        ...state,
        submitting: action.payload
      }
    }
    case 'FORM_SUBMITTED': {
      return {
        ...state,
        formSubmitted: action.payload
      }
    }
    case 'SIGNIN_ERROR':
      return { ...state, submissionError: action.payload };
    default:
      return state;
  }
}

interface SignInInterface {
  actions: any;
  globalDispatch: any;
}

function Main({ userId }: IMain) {
  const router = useRouter();
  const globalDispatch = useDispatch();

  const [{ form, formError, formHasError, formSubmitted, submitting }, dispatch] = useReducer(signInProcessReducer, signinInitialState);

  const onMouseLeaveEventHandler = (name: keyof SigninForm, value: string) => {
    if (!signInModel[name]?.test(value)) {
      dispatch({ type: 'FORM_ERROR', payload: { formHasError: true, name, value: `${camelCaseToNormal(name, true)} is required` } })
    } else {
      dispatch({ type: 'FORM_ERROR', payload: { name, value: null, formHasError: false } })
    }
  }

  const onSubmitHandlerLocal = () => {
    onSubmitHandler(form, signInModel, dispatch, 'signin')
  }



  useEffect(() => {
    const submitFormToServer = async () => {
      try {
        const response = await request({
          url: APIS.auth.signin,
          method: 'post',
          body: form
        });

        // globalDispatch(actions.authenticatedUser(response))
        router.push('/dashboard');

      } catch (err: any) {
        const { response: { data: { errors } } } = err;
        errors.forEach((error: any, i: number) => {
          dispatch({ type: 'FORM_ERROR', payload: { formHasError: true, name: error.field, value: error.message } })
          dispatch({ type: 'FORM_SUBMITTED', payload: false });
          dispatch({ type: 'SUBMITTING', payload: false });
        });
        console.log('err', errors[0].message);
      }


    }
    if (formSubmitted && !formHasError) {
      submitFormToServer();
    }
  }, [formHasError, formSubmitted, router, form, globalDispatch]);




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
              autoComplete={false}
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
              autoComplete={false}
            />

          </div>




          <div className={styles.form__row}>
            <Button
              type='square'
              variant="primary"

              onClick={() => !submitting ? onSubmitHandlerLocal() : null}
            >
              {submitting ? "Please wait..." : "Signup"}
            </Button>
          </div>

        </div>
      </FormTemplate>
    </>

  )
}

export default dynamic(() => Promise.resolve(Main), { ssr: false });
