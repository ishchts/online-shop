import { Link as RouterLink } from "react-router-dom";

export const LinkBehavior = (props) => {
    const { href, ref, ...other } = props;
    return <RouterLink ref={ref} to={href} {...other} />;
}