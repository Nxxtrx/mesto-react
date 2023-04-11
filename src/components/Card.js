export default function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card)
  }
    return (
      <li className="cards__item">
        <button className="cards__delete-btn" type="button"></button>
        <img className="cards__image" alt={card.name} src={card.link} onClick={handleClick}/>
        <div className="cards-description">
          <h2 className="cards__subtitle">{card.name}</h2>
          <div className="cards__like-container">
            <button className="cards__like-btn" type="button"></button>
            <p className="cards__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
    )
}
