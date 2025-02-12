import { useState } from "react"
import MenuLinks from "./MenuLinks"
import MenuToggle from "./MenuToggle"
import NavBarContainer from "./NavBarContainer"
import AuthDisplay from "../Auth/AuthDisplay"

export default function NavBar(props) {
    const [isOpen, setIsOpen] = useState(false)
  
    const toggle = () => setIsOpen(!isOpen)
  
    return (
      <NavBarContainer {...props}>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
        <AuthDisplay />
      </NavBarContainer>
    )
  }