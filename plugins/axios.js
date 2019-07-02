import { Message } from 'element-ui';
export default function ({$axios, redirect}) {
  let token = sessionStorage.getItem('token');
  if (token) {
    token = 'Bearer ' + token
    $axios.defaults.headers.common['Authorization'] = token;
  } else {
    // if (location.href.indexOf('login') === -1) {
    //   location.href = '/login';
    // }
  }

  $axios.onResponse(function (response) {
    if ((response.config.url.indexOf('/login') != -1) && (response.data.code == 200)) {
      let token = response.headers['authentication-info']
      sessionStorage.setItem('token', token)
    }
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code == 401) {
      Message({
        message: error.response.data.msg,
        type: 'error'
      });
      location.href = '/login'
    } else if (code >= 400 && code < 500) {
      Message({
        message: error.response.data.msg,
        type: 'error'
      });
    } else if (code == 500) {
      Message({
        message: '服务器内部错误',
        type: 'error'
      });
    }
  })
}
