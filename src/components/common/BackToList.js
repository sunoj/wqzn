import React from 'react'
import { Link } from 'gatsby'
import IconArrowLeft from '../../images/icons/arrow-left.svg'

function BackToList({ name, to}) {
  return (
    <Link to={to} className="link midgrey hover-orange dib mr5 f8 flex items-center mb4">
      <IconArrowLeft style={{ width: '12px', height: '12px' }} />
      &ensp;
      {name}
    </Link>
  )
}

export default BackToList