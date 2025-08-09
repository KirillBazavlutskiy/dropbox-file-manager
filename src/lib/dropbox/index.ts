import { Dropbox } from 'dropbox';

const dbx = new Dropbox({
	accessToken: import.meta.env.VITE_DROPBOX_APP_ACCESS_KEY,
});

export default dbx;
