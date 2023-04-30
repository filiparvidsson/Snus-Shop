import { useAuth } from "../customHooks";
import { withRouter } from "../redux/withRouter";

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;