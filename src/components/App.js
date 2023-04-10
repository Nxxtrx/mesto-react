import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';



function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }



  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen = {handleEditAvatarClick} />
      <Footer />

      <PopupWithForm name = {'edit'} title = {'Редактирование профиля'} isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups}>
        <input className="popup__profile-edit popup__profile-edit_type_name" type="text" id="profile-name" name="name"
          placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="popup__input-error profile-name-error"></span>
        <input className="popup__profile-edit popup__profile-edit_type_description" type="text" id="profile-description"
          name="description" placeholder="Описание" required minLength="2" maxLength="200" />
        <span className="popup__input-error profile-description-error"></span>
      </PopupWithForm>

      <PopupWithForm name = {'add-item'} title = {'Новое место'} isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups}>
        <input className="popup__profile-edit popup__profile-edit_type_title" type="text" id="picture-title" name="name" placeholder="Название" required minLength="2" maxLength="30" />
        <span className="popup__input-error picture-title-error"></span>
        <input className="popup__profile-edit popup__profile-edit_type_src" type="url" id="picture-url" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error picture-url-error"></span>
      </PopupWithForm>

      <PopupWithForm name = {'change-avatar'} title = {'Обновить аватар'} isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups}>
        <input className="popup__profile-edit popup__profile-edit_type_src" type="url" name="link" id="avatar-url" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error avatar-url-error"></span>
      </PopupWithForm>

      <ImagePopup />

      <PopupWithForm name = {'confirm-deletion'} title = {'Вы уверены?'} ></PopupWithForm>

      <template id="cards-template">
        <li className="cards__item">
          <button className="cards__delete-btn" type="button"></button>
          <img className="cards__image" alt='#'/>
          <div className="cards-description">
            <h2 className="cards__subtitle"></h2>
            <div className="cards__like-container">
              <button className="cards__like-btn" type="button"></button>
              <p className="cards__like-counter">0</p>
            </div>
          </div>
        </li>
      </template>

    </div>

  );
}

export default App;
