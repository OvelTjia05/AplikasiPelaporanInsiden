import {saveIdUser} from './tipe';

const initData = {
  id_user: '',
};

export const rootReducer = (state = initData, action: any) => {
  switch (action.type) {
    case saveIdUser:
      //   console.log('print value halo: ', action);
      //   console.log('ini didalam state: ', state);
      //   return {...state, value: action.data};
      console.log('Berhasil simpan data id user yyyeeee rasengan!!!');
      return {id_user: action.data};

    default:
      return state;
  }
};
