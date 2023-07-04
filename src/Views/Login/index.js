import { joiResolver } from '@hookform/resolvers/joi';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import TextInput from 'Components/Shared/TextInput';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { login } from 'Redux/Auth/thunks';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.members.isPending);
  const [isOpen, setIsOpen] = useState(false);
  const [isMemberLogged, setIsMemberLogged] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const myState = location.state.myState;
  const route = location.routes.route;
  const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  const schema = Joi.object({
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': 'Email can´t be empty',
      'string.pattern.base': 'Email must be in a valid format'
    }),
    password: Joi.string().regex(RGXPassword).min(8).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      'string.empty': 'Password can´t be empty'
    })
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });
  const logUser = async (userValue) => {
    try {
      const dataResponse = await dispatch(login(userValue));
      console.log(dataResponse);
      const modalData = {
        title: dataResponse.type === 'LOGIN_ERROR' ? 'Error!' : 'Success!',
        desc: dataResponse.message
      };
      setModalInfo(modalData);
      if (dataResponse.type === 'LOGIN_ERROR') {
        setIsOpen(true);
        setIsMemberLogged(false);
      } else {
        setIsMemberLogged(true);
        setIsOpen(true);
      }
    } catch (error) {
      const modalData = {
        title: 'Error!',
        desc: error.message
      };
      setModalInfo(modalData);
    }
  };
  const closeForm = () => {
    if (isMemberLogged) {
      console.log(route);
      setIsOpen(true);
      history.push(route);
    }
    setIsOpen(!isOpen);
  };
  return (
    <section className={styles.container} data-testid="container-login">
      <Modal
        desc={modalInfo.desc}
        handleClose={closeForm}
        isOpen={isOpen}
        title={modalInfo.title}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(logUser)}>
        <TextInput
          error={errors.email?.message}
          register={register}
          inputType={'email'}
          labelName={'Email'}
          name={'email'}
          testId="input-email-login"
        />
        <TextInput
          error={errors.password?.message}
          register={register}
          inputType={'text'}
          labelName={'Password'}
          name={'password'}
          testId="input-password-login"
        />
        <div className={styles.btnContainer}>
          <div>
            <Button text="Cancel" type="cancel" clickAction={() => history.goBack()} />
            <Button text="Reset" type="reset" clickAction={() => reset()} />
          </div>
          <Button text={'Login'} type={'submit'} testId="confirm-button-login" />
        </div>
      </form>
      {!myState && <h2>Register Now!</h2>}
      {!myState && (
        <section className={styles.cardsCont}>
          <Link
            className={`${styles.cardContainer} ${styles.only}`}
            to="/signUp?membership=Only Classes Membership"
          >
            <div>
              <h3>ONLY CLASSES</h3>
              <p>$2500</p>
              <hr></hr>
              <p>Subscribe to classes.</p>
              <p>Access to the grid class.</p>
            </div>
          </Link>
          <Link
            to="/signUp?membership=Classic Membership"
            className={`${styles.cardContainer} ${styles.classic}`}
          >
            <div>
              <h3>CLASSIC</h3>
              <p>$4000</p>
              <hr></hr>
              <p>Free access to the weight room.</p>
              <p>Personalized follow-up by a trainer.</p>
              <p>Grid visualization.</p>
            </div>
          </Link>
          <Link
            to="/signUp?membership=Black Membership"
            className={`${styles.cardContainer} ${styles.black}`}
          >
            <div>
              <h3>BLACK</h3>
              <p>$6000</p>
              <hr></hr>
              <p>Free access to the weight room.</p>
              <p>Free access to classes with prior registration.</p>
              <p>Personalized follow-up by a trainer.</p>
              <p>Visualization of the grid.</p>
            </div>
          </Link>
        </section>
      )}
    </section>
  );
};

export default Login;