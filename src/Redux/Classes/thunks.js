import {
  getClassesSuccess,
  getClassesError,
  getClassesLoading,
  deleteClassLoading,
  deleteClassSuccess,
  deleteClassError,
  postClassLoading,
  postClassSuccess,
  postClassError
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
        method: 'DELETE'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      } else {
        dispatch(postClassSuccess(data.data));
        return data;
      }
    } catch (error) {
      dispatch(postClassError(error));
      return error;
    }
  };
};
