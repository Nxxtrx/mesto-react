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
import AddPlacePopup from './AddPlacePopup.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen]= React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState('')

  const [cards, setCards] = React.useState([]);

  const [isLoading, setIsLodaing] = React.useState(false)


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
    setIsLodaing(true)
    api.setUserInfo(name, description).then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    }).catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => setIsLodaing(false))
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLodaing(true)
    api.setUserAvatar(avatarLink).then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    }).catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => setIsLodaing(false))
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLodaing(true)
    api.setAddCard(cardData).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    }).catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => setIsLodaing(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen = {handleEditAvatarClick} onCardClick={handleCardClick}/>
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

      <PopupWithForm name = {'confirm-deletion'} title = {'Вы уверены?'} ></PopupWithForm>

    </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
