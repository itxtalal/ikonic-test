import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div>Header</div>
      <div>{children}</div>
      <div>Footer</div>
    </div>
  )
}

export default Layout
