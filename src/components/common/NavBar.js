import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "gatsby"
import { Spirit } from '../../styles/spirit-styles'
import { Logo } from "."
import { SearchModal } from './search'

const NavBar = ({ theme, location }) => {
    // Theme definitions
    const themeClasses = {
        dark: {
            menuItem: `middarkgrey-l1 link hover-orange nowrap`,
            logoTheme: `dark`,
            docsTitleClass: `orange`,
            searchBox: `bg-darkgrey-searchbar middarkgrey dark-placeholder`,
            icon: `fill-midlightgrey`,
        },
        light: {
            menuItem: Spirit.link.white,
            logoTheme: `light`,
            docsTitleClass: `white`,
            searchBox: `bg-white-10 white white-placeholder`,
            icon: `fill-white`,
        },
    }

    // fixed the following list in route '/action-guide/'
    let currentNav = `/${location.pathname.split('/')[1]}/`;
    const replaceList = [ '/document/', '/knowledge-base/', '/action-guide/']

    if (replaceList.indexOf(currentNav) >= 0) currentNav = '/action-guide/'

    const navigations = [
        { name: '列表', link: '/action-guide/' },
        { name: '标签', link: '/tagList/' },
        { name: '案例', link: '/showcase/' },
        { name: '关于', link: '/about/' },
    ]

    return (
        <nav className={`${Spirit.page.xl} flex flex-auto flex-nowrap items-center justify-between pt2 pb2`} data-cy="header-navigation">
            <div className="flex items-center nudge-bottom--2 w-sidebar-l">
                <a href="https://www.wqzn.org" rel="noopener noreferrer" className="nudge-top--3">
                    <Logo height={40} theme={theme} />
                </a>
                <a href="/" className={`${themeClasses[theme].docsTitleClass} gh-nav-logo-suffix relative ma0 ml4 pa0 pl4 f5 lh-1-5 fw4 link nudge-top--3`}>维权指南</a>
            </div>
            <div className="dn flex-ns flex-auto items-center overflow-x-auto mr12 mr0-l ml5 ml0-l">
                {
                    navigations.map( ( item, index ) => {
                        return (
                            <Link to={item.link} key={index}
                                className={`${themeClasses[theme].menuItem} ${item.link === currentNav ? 'fw6' : ''} nowrap f5 pa3 mr1 mr3-l nl3`}
                            >
                                {item.name}
                            </Link>
                        )
                    })
                }
            </div>
            <div className="relative pl3">
                <SearchModal theme={themeClasses[theme]} />
            </div>
        </nav>
    )
}

NavBar.defaultProps = {
    theme: `dark`,
}

NavBar.propTypes = {
    theme: PropTypes.oneOf([`dark`, `light`]),
}

export default NavBar
