import headerLogo from '../images/__logo.svg'

export default function Header() {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип место' className='header__logo' />
    </header>
  )
}
