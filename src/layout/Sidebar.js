import React from 'react'

class Sidebar extends React.Component {
  render () {
    return (
      <div className='content'>
        <nav className='sidebar scrolled-nav'>
          <ul className='side-nav'>
            <li className='side-nav__item side-nav__item'>
              <a href='/my-account' className='side-nav__link'>
                <span>Mój profil</span>
              </a>
            </li>
            <li className='side-nav__item'>
              <a href='/users-tracks' className='side-nav__link'>
                <span>Moje trasy</span>
              </a>
            </li>
            <li className='side-nav__item'>
              <a href='/users-home' className='side-nav__link'>
                <span>Tablica</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar
