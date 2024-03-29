import { useState, useEffect } from 'react';
import styles from './admins-form.module.css';
import Button from 'Components/Shared/Button';
import TextInput from 'Components/Shared/TextInput';
import Modal from 'Components/Shared/Modal';
import { useParams, useHistory } from 'react-router-dom';
import { createAdmin, getAdmins, putAdmins } from 'Redux/Admins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Shared/Spinner';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const AdminForm = () => {
  const history = useHistory();
  const admins = useSelector((state) => state.admins.data);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isAdminCreated, setIsAdminCreated] = useState(false);
  const loading = useSelector((state) => state.admins.isLoading);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const RGXPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const RGXEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.(com|[a-zA-Z]{2,})$/;

  const schemaUpdate = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(25)
      .pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({
        'string.pattern.base': 'First name must contain letters only',
        'string.min': 'First name can´t be shorter than 3 characters',
        'string.max': 'First name can´t be longer than 25 characters',
        'string.empty': 'First name can´t be empty'
      }),
    lastName: Joi.string()
      .min(3)
      .max(25)
      .pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Last name must contain letters only',
        'string.min': 'Last name can´t be shorter than 3 characters',
        'string.max': 'Last name can´t be longer than 25 characters',
        'string.empty': 'Last name can´t be empty'
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
      .min(4)
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'City must contain letters and spaces only',
        'string.empty': 'City can´t be empty',
        'string.min': 'City must have at least 4 characters'
      })
  });

  const schemaCreate = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(25)
      .pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({
        'string.pattern.base': 'First name must contain letters only',
        'string.min': 'First name can´t be shorter than 3 characters',
        'string.max': 'First name can´t be longer than 25 characters',
        'string.empty': 'First name can´t be empty'
      }),
    lastName: Joi.string()
      .min(3)
      .max(25)
      .pattern(/^[a-zA-Z-]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Last name must contain letters only',
        'string.min': 'Last name can´t be shorter than 3 characters',
        'string.max': 'Last name can´t be longer than 25 characters',
        'string.empty': 'Last name can´t be empty'
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
      .min(4)
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'City must contain letters and spaces only',
        'string.empty': 'City can´t be empty',
        'string.min': 'City must have at least 4 characters'
      }),
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': 'Email can´t be empty',
      'string.pattern.base': 'Email must be in a valid format'
    }),
    password: Joi.string().min(8).regex(RGXPass).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase, one lowercase and one number',
      'string.empty': 'Password can´t be empty',
      'string.min': 'Password must contain at least 8 characthers'
    })
  });

  const resolver = joiResolver(id ? schemaUpdate : schemaCreate);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({ mode: 'onSubmit', resolver });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    formEdit(id);
  }, []);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const formEdit = (id) => {
    if (id) {
      const data = admins.find((aux) => aux._id === id);
      if (data) {
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('dni', data.dni.toString());
        setValue('phone', data.phone.toString());
        setValue('city', data.city);
      }
    }
  };

  const handleCreateAdmin = async (formChange) => {
    try {
      const response = await dispatch(createAdmin(formChange));
      if (!response.error) {
        setIsAdminCreated(true);
        setResponseModal({
          title: 'Success!',
          description: response.message
        });
        setIsOpen(true);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsAdminCreated(false);
      setResponseModal({
        title: 'Error!',
        description: error.message
      });
      setIsOpen(true);
    }
  };

  const handleupdateAdmins = async (formChange) => {
    const payload = {
      id: id,
      body: formChange
    };

    const response = await dispatch(putAdmins(payload));

    if (!response.error) {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setIsAdminCreated(true);
    } else {
      setIsAdminCreated(false);
      setResponseModal({
        title: 'Error!',
        description: response.message
      });
    }
    setIsOpen(true);
  };

  const onSubmit = (data) => {
    id ? handleupdateAdmins(data) : handleCreateAdmin(data);
  };

  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    if (isAdminCreated) {
      setIsOpen(false);
      history.goBack();
    } else {
      switchIsOpen();
    }
  };

  return (
    <section className={styles.sectionForm}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        handleClose={() => closeForm()}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="admins-form">
        <div className={styles.subContainer}>
          <div>
            <TextInput
              labelName="First name"
              inputType="text"
              name="firstName"
              selectID="firstName"
              register={register}
              error={errors.firstName?.message}
            />
          </div>
          <div>
            <TextInput
              labelName="Last name"
              inputType="text"
              name="lastName"
              selectID="lastName"
              register={register}
              error={errors.lastName?.message}
            />
          </div>
          <div>
            <TextInput
              labelName="DNI"
              inputType="text"
              name="dni"
              selectID="dni"
              register={register}
              error={errors.dni?.message}
            />
          </div>
          <div>
            <TextInput
              labelName="Phone"
              inputType="text"
              name="phone"
              selectID="phone"
              register={register}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <TextInput
              labelName="City"
              inputType="text"
              name="city"
              selectID="city"
              register={register}
              error={errors.city?.message}
            />
          </div>
          {!id && (
            <>
              <div>
                <TextInput
                  labelName="Email"
                  inputType="text"
                  name="email"
                  id="email"
                  register={register}
                  error={errors.email?.message}
                />
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
            </>
          )}
        </div>
        <div className={styles.btnContainer}>
          <div>
            <Button text="Cancel" type="button" clickAction={() => history.goBack()} />
            <Button text="Reset" type="button" clickAction={() => reset()} />
          </div>
          {!id && <Button text="Add" type="submit" testId="add-button-admins" />}
          {id && <Button text="Save" type="submit" testId="save-button-admins" />}
        </div>
      </form>
    </section>
  );
};

export default AdminForm;
