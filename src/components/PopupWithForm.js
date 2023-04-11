export default function PopupWithForm({name, title, children, isOpen, onClose}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen? 'popup_opened' : ''}` } aria-label="Редактирование профиля">
      <div className= {`popup__container popup__container_type_${name} popup__overlay`}>
        <h3 className="popup__title">{title}</h3>
        <form className= {`popup__form popup__form_type_${name}`} name={name} noValidate>
          {children}
          <button className="popup__btn popup__btn-submit" type="submit" >Сохранить</button>
        </form>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </section>
  )
}

