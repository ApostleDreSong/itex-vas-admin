import axios from 'axios';
import { saveMe } from '../redux/actions/me/meActions';

export const FetchProfileDetails = () => async (dispatch: any) => {
	axios
		.get(`/api/v1/merchant/dashboard/user/me`)
		.then((res) => {
			dispatch(saveMe(res.data));
		})
		.catch((err) => console.log(err));
};
