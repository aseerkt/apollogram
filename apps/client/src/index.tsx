import ReactDOM from 'react-dom';
import './index.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import { apolloClient } from './utils/apolloClient';

dayjs.extend(relativeTime);

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
