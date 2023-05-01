import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useInput } from "../hooks/useInput";
import PopupWithForm from "./PopupWithForm"

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {



  const [userName, setUserName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [errorMessageUserName, setErrorMessageUserName] = React.useState('')
  const [errorMessageDescription, setErrorMessageDescription] = React.useState('')

  const userNameInput = useInput('', {isEmpty: true, minLength: 2})
  const userDescriptionInput = useInput('', {isEmpty: true, minLength: 2})



  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUserName(currentUser.name);
    setDescription(currentUser.about)
  }, [isOpen])

  React.useEffect(() => {
    userNameInput.setIsValid(true)
    userDescriptionInput.setIsValid(true)
    setErrorMessageUserName('')
    setErrorMessageDescription('')
  }, [onClose])

  function handleChangeName(e) {
    setUserName(e.target.value);
    userNameInput.onChange(e)
    setErrorMessageUserName(e.target.validationMessage)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser({
      name: userName,
      about: description,
    })
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    userDescriptionInput.onChange(e)
    setErrorMessageDescription(e.target.validationMessage)
  }

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактирование профиля"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onDisabled={!userNameInput.isValid || !userDescriptionInput.isValid}
    >

      <input
        type="text"
        className="popup__profile-edit popup__profile-edit_type_name"
        id="profile-name"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={userName || ""}
        onChange={handleChangeName}
        onFocus={userNameInput.onFocus}
      />

      <span className="popup__input-error profile-name-error">
        {(userNameInput.isDerty && userNameInput.isEmpty) ||
        (userNameInput.isDerty && userNameInput.minLengthError)
          ? errorMessageUserName
          : ""}
      </span>

      <input
        className="popup__profile-edit popup__profile-edit_type_description"
        type="text"
        id="profile-description"
        name="description"
        placeholder="Описание"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleChangeDescription}
        onFocus={userDescriptionInput.onFocus}
      />

      <span className="popup__input-error profile-description-error">
        {(userDescriptionInput.isDerty && userDescriptionInput.isEmpty) ||
        (userDescriptionInput.isDerty && userDescriptionInput.minLengthError)
          ? errorMessageDescription
          : ""}
      </span>

    </PopupWithForm>
  );
}
