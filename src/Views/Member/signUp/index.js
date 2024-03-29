import { joiResolver } from '@hookform/resolvers/joi';
import Button from 'Components/Shared/Button';
import DatePicker from 'Components/Shared/DatePicker';
import Select from 'Components/Shared/Select';
import TextInput from 'Components/Shared/TextInput';
import { createMember, getMembers } from 'Redux/Members/thunks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Joi from 'joi';
import Spinner from 'Components/Shared/Spinner';
import Modal from 'Components/Shared/Modal';
import styles from './signUp.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignUpMember = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.members.isPending);
  const [isOpen, setIsOpen] = useState(false);
  const [isMemberCreated, setIsMemberCreated] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const currentDate = new Date();
  const minDate = new Date();
  minDate.setFullYear(currentDate.getFullYear() - 15);

  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(11)
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'First name must contain letters only',
        'string.min': 'First name can´t be shorter than 3 characters',
        'string.max': 'First name can´t be longer than 25 characters',
        'string.empty': 'First name can´t be empty'
      }),
    lastName: Joi.string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Last name must contain letters only',
        'string.min': 'Last name can´t be shorter than 3 characters',
        'string.max': 'Last name can´t be longer than 25 characters',
        'string.empty': 'Last name can´t be empty'
      }),
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': 'Email can´t be empty',
      'string.pattern.base': 'Email must be in a valid format'
    }),
    dni: Joi.string()
      .regex(/^[0-9]*$/)
      .min(7)
      .max(9)
      .required()
      .messages({
        'string.min': 'DNI must have 7-9 digits',
        'string.max': 'DNI must have 7-9 digits',
        'string.empty': 'DNI can´t be empty',
        'string.pattern.base': 'DNI must be only numbers'
      }),
    phone: Joi.string()
      .regex(/^[0-9]*$/)
      .length(10)
      .required()
      .messages({
        'string.length': 'Phone number must have 10 digits',
        'string.empty': 'Phone number can´t be empty',
        'string.pattern.base': 'Phone number must be only numbers'
      }),
    city: Joi.string()
      .min(3)
      .regex(/^[a-zA-Z\s.,]+$/)
      .required()
      .messages({
        'string.pattern.base': 'City must contain letters and spaces only',
        'string.empty': 'City can´t be empty',
        'string.min': 'City must have at least 4 characters'
      }),
    birthday: Joi.date().iso().max(minDate.toISOString()).required().messages({
      'date.format': 'Invalid birth date format',
      'date.max': 'You must be at least 15 years old'
    }),
    postalCode: Joi.string()
      .regex(/^[0-9]*$/)
      .min(4)
      .max(5)
      .required()
      .messages({
        'string.min': 'Postal code must have at least 4 digits',
        'string.max': 'Postal code can´t have more than 5 digits',
        'string.empty': 'Postal code can´t be empty',
        'string.pattern.base': 'Postal code must be only numbers'
      }),
    membership: Joi.string()
      .valid('Only Classes Membership', 'Classic Membership', 'Black Membership')
      .required()
      .messages({
        'any.required': 'Membership is required',
        'any.only': 'Invalid Membership'
      }),
    profilePhoto: Joi.string(),
    isActive: Joi.boolean(),
    password: Joi.string().min(8).regex(RGXPassword).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
      'string.empty': 'Password can´t be empty',
      'string.min': 'Password must be at least 8 characters long'
    })
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const membership = searchParams.get('membership');
    if (membership) {
      setValue('membership', membership);
    }
  }, [location.search, setValue]);
  const addMember = async (memberValues) => {
    const payload = {
      ...memberValues,
      profilePhoto: `${process.env.PUBLIC_URL}/assets/images/defaultProfile.png`
    };
    try {
      const dataResponse = await dispatch(createMember(payload));
      const modalData = {
        title: dataResponse.error ? 'Error!' : 'Success!',
        desc: dataResponse.message
      };
      setModalInfo(modalData);
      dispatch(getMembers());
      if (dataResponse.error) {
        setIsOpen(true);
        setIsMemberCreated(false);
      } else {
        setIsOpen(true);
        setIsMemberCreated(true);
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
    if (isMemberCreated) {
      setIsOpen(false);
      history.push('/auth/login');
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.container}>
      <Modal
        desc={modalInfo.desc}
        handleClose={closeForm}
        isOpen={isOpen}
        title={modalInfo.title}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(addMember)} data-testid="sign-up-form">
        <div className={styles.subContainer}>
          <div>
            <TextInput
              labelName={'First Name'}
              name={'firstName'}
              inputType={'text'}
              register={register}
              testId="first-name-sign-up"
              error={errors.firstName?.message}
            />
          </div>
          <div>
            <TextInput
              labelName={'Last Name'}
              name={'lastName'}
              inputType={'text'}
              register={register}
              testId="last-name-sign-up"
              error={errors.lastName?.message}
            />
          </div>
          <div>
            <TextInput
              labelName={'Email'}
              name={'email'}
              inputType={'text'}
              register={register}
              testId="email-sign-up"
              error={errors.email?.message}
            />
          </div>
          <div>
            <TextInput
              labelName={'DNI'}
              name={'dni'}
              inputType={'text'}
              register={register}
              testId="dni-sign-up"
              error={errors.dni?.message}
            />
          </div>
          <div>
            <TextInput
              labelName={'Phone'}
              name={'phone'}
              inputType={'text'}
              register={register}
              testId="phone-sign-up"
              error={errors.phone?.message}
            />
          </div>
          <div>
            <TextInput
              labelName={'City'}
              name={'city'}
              inputType={'text'}
              register={register}
              testId="city-sign-up"
              error={errors.city?.message}
            />
          </div>
          <div>
            <TextInput
              labelName={'PostalCode'}
              name={'postalCode'}
              inputType={'text'}
              register={register}
              testId="postal-code-sign-up"
              error={errors.postalCode?.message}
            />
          </div>
          <div className={styles.contDate}>
            <DatePicker
              name={'birthday'}
              title={'Birthday'}
              register={register}
              error={errors.birthday?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Membership</label>
            <Select
              name={'membership'}
              selectID={''}
              register={register}
              error={errors.membership?.message}
            >
              <option value="">Choose a membership</option>
              <option value="Black Membership">Black Membership</option>
              <option value="Classic Membership">Classic Membership</option>
              <option value="Only Classes Membership">Only Classes Membership</option>
            </Select>
          </div>
          <div className={styles.passwordContainer}>
            <TextInput
              error={errors.password?.message}
              register={register}
              inputType={showPassword ? 'text' : 'password'}
              labelName={'Password'}
              name={'password'}
              testId="input-password-login"
            />
            {!showPassword && (
              <FiEyeOff className={styles.editIcon} onClick={togglePasswordVisibility} />
            )}
            {showPassword && (
              <FiEye className={styles.editIcon} onClick={togglePasswordVisibility} />
            )}
          </div>
          <div className={styles.inputContainer}></div>
        </div>
        <div className={styles.contButton}>
          <div>
            <Button text="Cancel" type="cancel" clickAction={() => history.goBack()} />
            <Button text="Reset" type="reset" clickAction={() => reset()} />
          </div>
          <Button type="submit" text={'Add'} testId="sign-up-confirm-button" />
        </div>
      </form>
    </div>
  );
};
export default SignUpMember;
