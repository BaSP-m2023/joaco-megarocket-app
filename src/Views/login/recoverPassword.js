import styles from './login.module.css';
import { joiResolver } from '@hookform/resolvers/joi';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import TextInput from 'Components/Shared/TextInput';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { recoverPassword } from 'Redux/RecoverPassword/thunks';
const recoveryPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.recoverPassword.isLoading);
  const error = useSelector((state) => state.recoverPassword.error);

  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const [email, setEmail] = useState(false);
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  const schema = Joi.object({
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': 'Email can´t be empty',
      'string.pattern.base': 'Email must be in a valid format'
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  const onSubmit = async (email) => {
    try {
      await dispatch(recoverPassword(email.email));
      if (error !== null) {
        setIsOpen(true);
        setModalInfo({
          title: 'Recovering password...',
          desc: 'Please check your email inbox'
        });
        setEmail(true);
      } else {
        throw new Error();
      }
    } catch (error) {
      setEmail(false);
      setModalInfo({
        title: 'Error!',
        desc: 'There is no user with this email address'
      });
      setIsOpen(true);
      setEmail(false);
    }
  };

  const closeForm = () => {
    if (email) {
      history.push('/auth/login');
      setIsOpen(!isOpen);
    }
    setIsOpen(!isOpen);
  };

  return (
    <section className={styles.container} data-testid="container-recoverPassword">
      <Modal
        desc={modalInfo.desc}
        handleClose={closeForm}
        isOpen={isOpen}
        title={modalInfo.title}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.recoverTitle}>Recover Password</h3>
        <p>We will send you an email with the instruccions for recover your password</p>
        <TextInput
          error={errors.email?.message}
          inputType={'email'}
          labelName={'Email'}
          name={'email'}
          testId="input-email-recoverPassword"
          register={register}
        />
        <div className={styles.btnContainer}>
          <div>
            <Button text="Cancel" type="cancel" clickAction={() => history.goBack()} />
          </div>
          <Button
            text={'Recover Password'}
            type={'submit'}
            clickAction={handleSubmit(onSubmit)}
            testId="confirm-button-login"
          />
        </div>
      </form>
    </section>
  );
};
export default recoveryPassword;
