import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';
import { deleteAdmin, getAdmins } from '../../Redux/Admins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Shared/Spinner';
import Table from '../Shared/Table';

function Admins() {
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.data);
  const loading = useSelector((state) => state.admins.isLoading);

  const handleDeleteAdmin = async () => {
    try {
      const response = await dispatch(deleteAdmin(idDelete));
      if (!response.error) {
        setResponseModal({
          title: 'Success!',
          description: response.message,
          isConfirm: false
        });
        dispatch(getAdmins());
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setResponseModal({
        title: 'Error!',
        description: error.message,
        isConfirm: false
      });
    }
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const openModalConfirm = (id) => {
    setIdDelete(id);
    setResponseModal({
      title: 'Confirm',
      description: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };

  return admins.length > 0 ? (
    <div className={styles.container}>
      <section>
        <Modal
          title={responseModal.title}
          desc={responseModal.description}
          isOpen={isOpen}
          confirmModal={responseModal.isConfirm}
          handleClose={() => setIsOpen(!isOpen)}
          deleteFunction={() => handleDeleteAdmin()}
        />
        {loading && <Spinner />}
        {!loading && (
          <div>
            <Link to="/admins/form">
              <Button text="Create" type="create" />
            </Link>
            <Table
              list={admins}
              column={['Name', 'Last Name', 'DNI', 'Phone', 'Email', 'City', '']}
              fields={['firstName', 'lastName', 'dni', 'phone', 'email', 'city']}
              link={'/admins/form/'}
              action={openModalConfirm}
            />
          </div>
        )}
      </section>
    </div>
  ) : (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => handleDeleteAdmin()}
      />
      <section>
        <Link to="/admins/form">
          <Button text="Create" type="create" />
        </Link>
        <p className={styles.info}>There is no Admin yet.</p>
      </section>
    </section>
  );
}

export default Admins;
