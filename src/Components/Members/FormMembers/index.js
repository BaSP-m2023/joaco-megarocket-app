import { useEffect, useState } from 'react';
import styles from './form-members.module.css';
import TextInput from '../../Shared/TextInput';
import Select from '../../Shared/Select';
import Button from '../../Shared/Button';
import DatePicker from '../../Shared/DatePicker';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import { createMember, getMembers, updateMember } from '../../../Redux/Members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Shared/Spinner';

const FormMembers = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const listMembers = useSelector((state) => state.members.data);
  const loading = useSelector((state) => state.members.isPending);
  const [isOpen, setIsOpen] = useState(false);
  const [isMemberCreated, setIsMemberCreated] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  const initialMemberValues = {
    firstName: '',
    lastName: '',
    email: '',
    dni: '',
    phone: '',
    city: '',
    birthday: '',
    postalCode: '',
    membership: '',
    isActive: true
  };

  const [memberValues, setMemberValues] = useState(initialMemberValues);

  useEffect(() => {
    formEdit(id);
  }, []);

  const formEdit = (id) => {
    if (id) {
      const data = listMembers.find((aux) => aux._id === id);
      if (data) {
        setMemberValues({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dni: data.dni,
          phone: data.phone,
          city: data.city,
          birthday: data.birthday,
          postalCode: data.postalCode,
          membership: data.membership,
          isActive: data.isActive
        });
        setIsMemberCreated(true);
      }
    } else {
      setMemberValues(initialMemberValues);
      setIsMemberCreated(false);
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setMemberValues({
      ...memberValues,
      [name]: value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!id) {
      addMember();
    } else {
      handleUpdateMember();
    }
  };

  const handleUpdateMember = async () => {
    const payload = {
      id: id,
      body: memberValues
    };
    const response = await dispatch(updateMember(payload));
    const modalData = {
      title: response.error ? 'Error!' : 'Success!',
      desc: response.message
    };
    setModalInfo(modalData);

    if (response.error) {
      setIsOpen(true);
      setIsMemberCreated(false);
    } else {
      setIsOpen(true);
      setIsMemberCreated(true);
    }
  };

  const addMember = async () => {
    try {
      const dataResponse = await dispatch(createMember(memberValues));
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
      history.goBack();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section className={styles.container}>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={closeForm}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.subContainer}>
          <div>
            <TextInput
              labelName={'First Name'}
              inputName={'firstName'}
              changeAction={onChange}
              inputType={'text'}
              text={memberValues.firstName}
            />
          </div>
          <div>
            <TextInput
              labelName={'Last Name'}
              inputName={'lastName'}
              changeAction={onChange}
              inputType={'text'}
              text={memberValues.lastName}
            />
          </div>
          <div>
            <TextInput
              labelName={'Email'}
              inputName={'email'}
              changeAction={onChange}
              inputType={'text'}
              text={memberValues.email}
            />
          </div>
          <div>
            <TextInput
              labelName={'DNI'}
              inputName={'dni'}
              changeAction={onChange}
              inputType={'text'}
              text={memberValues.dni}
            />
          </div>
          <div>
            <TextInput
              labelName={'Phone'}
              inputName={'phone'}
              changeAction={onChange}
              inputType={'text'}
              text={memberValues.phone}
            />
          </div>
          <div>
            <TextInput
              labelName={'City'}
              inputName={'city'}
              changeAction={onChange}
              inputType={'text'}
              text={memberValues.city}
            />
          </div>
          <div>
            <TextInput
              labelName={'PostalCode'}
              inputName={'postalCode'}
              changeAction={onChange}
              inputType={'text'}
              text={memberValues.postalCode}
            />
          </div>
          <div className={styles.contDate}>
            <DatePicker
              changeAction={onChange}
              name={'birthday'}
              title={'Birthday'}
              val={memberValues.birthday}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Membership</label>
            <Select
              changeAction={onChange}
              name={'membership'}
              selectID={''}
              selectValue={memberValues.membership}
            >
              <option value="">Seleccionar</option>
              <option value="Black Membership">Black Membership</option>
              <option value="Classic Membership">Classic Membership</option>
              <option value="Only Classes Membership">Only Classes Membership</option>
            </Select>
          </div>
          <div className={styles.inputContainer}>
            {id && (
              <>
                <label className={styles.label}>Status</label>
                <Select
                  changeAction={onChange}
                  name={'isActive'}
                  selectID={''}
                  selectValue={memberValues.isActive}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Select>
              </>
            )}
          </div>
        </div>
        <div className={styles.contButton}>
          <Button clickAction={() => history.goBack()} text={'Cancel'} />
          <Button clickAction={submit} text={id ? 'Save' : 'Add'} />
        </div>
      </form>
    </section>
  );
};

export default FormMembers;
