import React from 'react';
import Card from './Card.js';
import {api} from '../utils/Api.js';

export default function Main({onEditProfile, isAddPlacePopupOpen, isEditAvatarPopupOpen, onCardClick}) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then(data => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
    }).catch(err => console.log(`Ошибка: ${err}`));
    api.getInitialCards().then(data => {
      setCards(data)
    }).catch(err => console.log(`Ошибка: ${err}`));
  }, []);


  return (
    <main className="main">

      <section className="profile">

        <div className="profile__avatar">
          <button className="profile__avatar-btn" onClick={isEditAvatarPopupOpen}>
            <img src={userAvatar} className="profile__avatar-image" alt="Фотография профиля" />
          </button>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__subtitle">{userDescription}</p>
          <button className="profile__edit-button" onClick={onEditProfile} name="edit-prf-btn" type="button"></button>
        </div>

        <button className="profile__add-button" onClick={isAddPlacePopupOpen} name="add-prf-btn" type="button"></button>
      </section>

      <section className="cards" aria-label="Добавленный фотографии">
        <ul className="cards__list">
          {cards.map(item => <Card card={item} onCardClick={onCardClick} key={item._id}/>)}
        </ul>
      </section>

    </main>
  );
}
