import React from 'react';
import {api} from '../utils/Api.js';



export default function Main({onEditProfile, isAddPlacePopupOpen, isEditAvatarPopupOpen}) {

  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')

  React.useEffect(() => {
    api.getUserInfo().then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
    })
  })


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
        <ul className="cards__list"></ul>
      </section>

    </main>
  );
}
