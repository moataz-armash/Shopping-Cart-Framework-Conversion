import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

interface LinkProps {
  to: string;
  label?: string;
  icon?: string;
}

export default function NavBarLink(props: LinkProps) {
  return (
    <NavLink
      to={props.to}
      className="flex flex-row items-center gap-x-2 px-2 py-2 font-franklin text-white duration-150 hover:underline active:text-tahiti-light"
    >
      {props.label}
      {props.icon && <Icon className="h-6 w-6" icon={props.icon} />}
    </NavLink>
  );
}
