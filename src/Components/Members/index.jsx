import { useEffect, useState } from 'react';
import styles from './members.module.css';
import Table from './Table';
import Form from './Form';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [memberValues, setMemberValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dni: '',
    phone: '',
    city: '',
    birthday: '2023-05-29T07:32:26+0000',
    postalCode: '',
    membership: '',
    isActive: true
  });
  const [idMember, setIdMember] = useState('');
  const getMembers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/members`);
    const data = await response.json();
    setMembers(data.data);
    console.log(data);
  };

  useEffect(() => {
    getMembers();
  }, []);

  const changeDateFormat = (date) => {
    let dateArray = date.split('-');

    let year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];

    dateArray = month + '/' + day + '/' + year;
    return dateArray;
  };

  const updateMember = async (idMember) => {
    const dateFormat = changeDateFormat(memberValues.birthday);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/members/${idMember}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...memberValues, birthday: dateFormat })
      });

      const updatedMember = await response.json();
      if (response.ok) {
        const dataIndex = members.findIndex((Member) => Member._id === idMember);

        setMembers((currentMembers) => {
          const updatedMembers = [...currentMembers];
          updatedMembers[dataIndex] = updatedMember.data;
          return updatedMembers;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMember = async (member) => {
    const dateFormat = changeDateFormat(member.birthday);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...member, birthday: dateFormat })
      });
      if (response.ok) {
        setMembers([...members, member]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMember = async (memberId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/members/${memberId}`, {
        method: 'DELETE'
      });
      console.log(response);
      setMembers([...members.filter((member) => member._id !== memberId)]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      {showForm ? (
        <Form
          addMember={addMember}
          memberValues={memberValues}
          setMemberValues={setMemberValues}
          updateMember={updateMember}
          idMember={idMember}
          setIdMember={setIdMember}
          setShowForm={setShowForm}
        />
      ) : (
        <>
          <Table
            members={members}
            deleteMember={deleteMember}
            setIdMember={setIdMember}
            setMemberValues={setMemberValues}
            setShowForm={setShowForm}
          />
          <button className={styles.button} onClick={() => setShowForm(true)}>
            Add
          </button>
        </>
      )}
    </section>
  );
};

export default Members;
