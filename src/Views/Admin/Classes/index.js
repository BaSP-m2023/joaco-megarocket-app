import { useEffect, useState } from 'react';
import styles from './classes.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import { Link } from 'react-router-dom';
import { deleteClass, getClasses } from 'Redux/Classes/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Aside from 'Components/Shared/Aside';
import { FiEdit } from 'react-icons/fi';

function Classes() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.data);
  const loading = useSelector((state) => state.classes.isLoading);

  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const handleDeleteClass = async () => {
    try {
      const response = await dispatch(deleteClass(idDelete));
      if (response.error) {
        throw new Error(response.message);
      } else {
        setResponseModal({
          title: 'Success!',
          description: response.message,
          isConfirm: false
        });
        dispatch(getClasses());
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
    dispatch(getClasses());
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

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00'
  ];

  return (
    <>
      <Aside page={'admins'} />
      <div className={styles.mainContainer}>
        <section className={styles.container}>
          <Modal
            title={responseModal.title}
            desc={responseModal.description}
            isOpen={isOpen}
            confirmModal={responseModal.isConfirm}
            handleClose={() => setIsOpen(!isOpen)}
            deleteFunction={() => handleDeleteClass()}
          />
          <div className={styles.screenContainer}>
            {loading && <Spinner />}
            {!loading && (
              <section>
                <table>
                  <thead>
                    <tr className={styles.tr}>
                      <th className={styles.background}>
                        <div>
                          <Link to="/admins/classes/form">
                            <Button text="Create" type="create" testId="create-button-classes" />
                          </Link>
                        </div>
                      </th>
                      {weekDays.map((day) => (
                        <th key={day} className={styles.th}>
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((hour) => (
                      <>
                        <tr className={styles.tr}>
                          <th className={styles.th}>{hour}</th>
                          {weekDays.map((day, dayIndex) => (
                            <td key={dayIndex}>
                              {classes
                                .filter(
                                  (oneClass) => oneClass.day === day && oneClass.hour === hour
                                )
                                .map((oneClass, index) => {
                                  return (
                                    <div className={styles.card} key={index}>
                                      <div className={styles.classCard}>
                                        <p className={styles.inlineBlock}>
                                          <div>{`Activity: ${
                                            oneClass && oneClass.activity
                                              ? oneClass.activity.name
                                              : 'not available'
                                          }`}</div>
                                          <div>{`Trainer: ${
                                            oneClass && oneClass.trainer
                                              ? oneClass.trainer.firstName
                                              : 'not available'
                                          }`}</div>
                                          <div>{`Slots: ${oneClass.slots}`}</div>
                                        </p>
                                        <Link
                                          to={'/admins/classes/form/' + oneClass._id}
                                          className={styles.edit}
                                        >
                                          <FiEdit className={styles.editIcon} />
                                        </Link>
                                        <button
                                          className={styles.delete}
                                          onClick={() => openModalConfirm(oneClass._id)}
                                        >
                                          X
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                            </td>
                          ))}
                        </tr>
                      </>
                    ))}
                    <tr className={styles.tr}>
                      <td colSpan={weekDays.length + 1}>
                        {classes.length === 0 && <p>There are no classes yet.</p>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Classes;
