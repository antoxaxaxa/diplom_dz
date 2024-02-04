/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
      let sidebarButton = document.querySelector(".sidebar-toggle");
      sidebarButton.addEventListener("click",function (){
        // Переключение класса sidebar-open у body
        document.body.classList.toggle('sidebar-open');
        // Переключение класса sidebar-collapse у body
        document.body.classList.toggle('sidebar-collapse');
      });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerButton = document.querySelector('.menu-item_register');
    const loginButton = document.querySelector('.menu-item_login');
    const logoutButton = document.querySelector('.menu-item_logout');

    // Регистрация обработчика событий для кнопки "Регистрация"
    registerButton.addEventListener('click', () => {
      const modalRegister = App.getModal('modal-register');
      modalRegister.open();
    });

    // Регистрация обработчика событий для кнопки "Войти"
    loginButton.addEventListener('click', () => {
      const modalLogin = App.getModal('modal-login');
      modalLogin.open();
    });

    // Регистрация обработчика событий для кнопки "Выйти"
    logoutButton.addEventListener('click', async () => {
      const response = await User.logout();
      if (response.success) {
        App.setState('init');
      }
    });
  }

}

