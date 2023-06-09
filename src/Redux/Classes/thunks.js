import {
  getClassesSuccess,
  getClassesError,
  getClassesLoading,
  deleteClassLoading,
  deleteClassSuccess,
  deleteClassError,
  postClassLoading,
  postClassSuccess,
  postClassError,
  putClassLoading,
  putClassSuccess,
  putClassError
} from './actions';

export const getClasses = () => {
  return async (dispatch) => {
    try {
      dispatch(getClassesLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      } else {
        dispatch(getClassesSuccess(data.data));
      }
    } catch (error) {
      dispatch(getClassesError(error));
    }
  };
};

export const deleteClass = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteClassLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        dispatch(deleteClassError(data.message));
        return response;
      } else {
        dispatch(deleteClassSuccess(data.data));
        return data;
      }
    } catch (error) {
      dispatch(deleteClassError(error));
      return error;
    }
  };
};

export const createClass = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(postClassLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(postClassError(data.message));
        return data;
      } else {
        dispatch(postClassSuccess(data.data));
        return data;
      }
    } catch (error) {
      return error;
    }
  };
};

export const updateClass = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(putClassLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(payload.body)
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(putClassError(data.message));
        return data;
      } else {
        dispatch(putClassSuccess(data.data, payload.id));
        return data;
      }
    } catch (error) {
      return error;
    }
  };
};

export const deleteOldClasses = () => {
  return async (dispatch) => {
    try {
      dispatch(deleteClassLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteClassSuccess(data.data));
      } else {
        dispatch(deleteClassError(data.data));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};
