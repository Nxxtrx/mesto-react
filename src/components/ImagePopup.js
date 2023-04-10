export default function ImagePopup() {
  return (
    <section className="popup popup_type_open-image" aria-label="Открытие картинок">
      <div className="popup__image-container popup__overlay">
        <figure className="popup__figure">
          <img className="popup__image" src="#" alt="#" />
          <figcaption className="popup__image-title"></figcaption>
        </figure>
        <button type="button" className="popup__close popup__close_image"></button>
      </div>
    </section>
  )
}
