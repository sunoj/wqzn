import React from 'react'
import PropTypes from 'prop-types'

import SidebarLink from './SidebarLink'
import SidebarList from './SidebarList'
import getSidebarFile from './getSidebarFile'

const SidebarNav = ({ sidebar, location, groups }) => {
    const sidebarfile = getSidebarFile(sidebar)

    if (!sidebar || !sidebarfile || !sidebarfile.groups) {
        return null
    }

    groups && ( sidebarfile.groups = groups );

    return (
        <nav className="mt5 mb5 mt10-ns mb0-ns relative" data-cy="sidebar">
            {sidebarfile.groups.map((group, i) => (
                group.items[0] && (
                    <div key={i} className="mt1">
                        <h4 className="f5 fw5 link pa0 ma0">
                            {group.items[0].link
                                ? <SidebarLink link={group.items[0].link} title={group.group} linkClasses="midgrey hover-orange-l2 link" />
                                : group.group
                            }
                        </h4>
                        {group.items.some(item => (item.link === decodeURIComponent(location.pathname)))
                            ? <SidebarList
                                    key={i}
                                    items={group.items}
                                    location={location}
                                />
                            : ''
                        }
                    </div>
                )
            ))}
        </nav>
    )
}

SidebarNav.defaultProps = {
    location: { pathname: `/` },
}

SidebarNav.propTypes = {
    sidebar: PropTypes.string.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default SidebarNav
