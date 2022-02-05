import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import './index.css'

function Index() {
  return <React.StrictMode>
      <App/>
  </React.StrictMode>
}

ReactDom.render(<Index/>, document.getElementById('root'))

export default Index;
