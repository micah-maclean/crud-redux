import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import Routers from "./Routers";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <Routers/>
  </Provider>
 
);
