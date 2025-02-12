import { Text } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import classes from "./MenuItem.module.css";


export default function MenuItem ({ children, isLast, to = "/", ...rest }) {
  const setActive = ({isActive}) => isActive ? classes.active : '';
  return (
    <NavLink to={to} className={setActive}>
      <Text fontSize="lg" display="block" {...rest}>
        {children}
      </Text>
    </NavLink>
  )
}