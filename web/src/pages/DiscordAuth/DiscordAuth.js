import {Fragment} from "react";
import {useHistory, useParams} from "react-router-dom";

function DiscordAuth(props) {
    //const params = useParams();
    // const history = useHistory();
    const urlParams = new URLSearchParams(props.location.search);
    const error = urlParams.get("error");
    const errorMessage = urlParams.get("error_description");
    const accessToken = urlParams.get("code");

    // TODO: Send the token to the server and await a response.
    return (
        <Fragment>
           <span> {error ? error + ": " + errorMessage : accessToken} </span>
        </Fragment>
    )
}

export default DiscordAuth;