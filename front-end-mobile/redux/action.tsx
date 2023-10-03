import {saveIdUser} from './tipe';

export const saveIdUserAction = (data: string) => ({
  type: saveIdUser,
  data,
});
