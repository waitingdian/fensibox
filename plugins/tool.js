import Vue from 'vue'

let commonJS = {
  install (Vue, option) {
    // 该事件是核心
    if (!sessionStorage.length) {
      localStorage.setItem('getSession', Date.now());
    };
    // 该事件是核心
    window.addEventListener('storage', function(event) {
      //已有窗口
      if (event.key == 'getSession') {
        localStorage.setItem('setSession', JSON.stringify(sessionStorage));
        localStorage.removeItem('setSession');
      }
      //新开窗口
      else if(event.key == 'setSession' && !sessionStorage.length) {
        let data = JSON.parse(event.newValue);
        //赋给这个窗口的sessionStorage
        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }
      }
    });
  }
}

Vue.use(commonJS)
