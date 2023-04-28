import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen]= React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState('')

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then(data => {
      setCurrentUser(data)
    }).catch(err => console.log(`Ошибка: ${err}`));
  }, [])

  React.useEffect(() => {
    api.getInitialCards().then(data => {
      setCards(data)
    }).catch(err => console.log(`Ошибка: ${err}`));
  }, []);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  }).catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards(cards => cards.filter((c) => c._id !== card._id))
    }).catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleUpdateUser(name, description) {
    api.setUserInfo(name, description).then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
  }

  function handleUpdateAvatar(avatarLink) {
    api.setUserAvatar(avatarLink).then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen = {handleEditAvatarClick} onCardClick={handleCardClick}/>
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <PopupWithForm name = {'add-item'} title = {'Новое место'} isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups}>
        <input className="popup__profile-edit popup__profile-edit_type_title" type="text" id="picture-title" name="name" placeholder="Название" required minLength="2" maxLength="30" />
        <span className="popup__input-error picture-title-error"></span>
        <input className="popup__profile-edit popup__profile-edit_type_src" type="url" id="picture-url" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error picture-url-error"></span>
      </PopupWithForm>

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

      <PopupWithForm name = {'confirm-deletion'} title = {'Вы уверены?'} ></PopupWithForm>

    </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
