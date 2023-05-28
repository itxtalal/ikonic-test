import React from 'react'
import SideNav from './SideNav'
import Header from './Header'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col gap-12 min-h-screen h-full w-screen mx-6 my-12">
      <SideNav>
        <Header />
        <div>{children}</div>
      </SideNav>
    </div>
  )
}

export default Layout
