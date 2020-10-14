import React from 'react'

class Sidebar extends React.Component {
  render () {
    return (
      <div className='sidebar-content'>
        <nav className='sidebar'>
          <ul className='side-nav'>
            <li className='side-nav__item'>
              <a href='#!' className='side-nav__link'>
                <span>trasy</span>
              </a>
            </li>
             <li className='side-nav__item'>
              <a href='#!' className='side-nav__link'>
                <span>mój profil</span>
              </a>
            </li>
             <li className='side-nav__item'>
              <a href='#!' className='side-nav__link'>
                <span>posty</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar
