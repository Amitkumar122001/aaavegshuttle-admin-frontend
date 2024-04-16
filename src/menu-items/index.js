import dashboard from './dashboard';
// import pages from './pages';
// import other from './other';
// import buses from './bus';
// import user from './user';
// import vendor from './vendor';
import utilities from './utilities';
// import { store } from '../store/index';
// ==============================|| MENU ITEMS ||============================== //
// let state = store.getState();
// let role = state?.customization.role;
const menuItems = {
  items: [dashboard, utilities]
};
// other
export default menuItems;
