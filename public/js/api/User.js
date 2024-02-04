/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * user - Данные пользователя.
   * */
  static URL = '/user';
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const userString = localStorage.getItem('user');
    return userString && JSON.parse(userString);   //если юзер не null тогда преобразование
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * callback - Callback-функция.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      callback: function(err, response) {
        if (response.success) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * data - Параметры запроса.
   * callback - Callback-функция.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * data - Параметры запроса.
   * callback - Callback-функция.
   * */
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      data: data,
      callback: function(err, response) {
        if (response.success) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: function(err, response) {
        if (response.success) {
          User.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}


