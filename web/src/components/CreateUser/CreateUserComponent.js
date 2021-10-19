import React, {useState} from "react";
import './CreateUserComponent.css'

function CreateUserComponent() {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 3000)

    }

    return (
        <div class="createUser">
            { submitting &&
                <div>Submitting Form...</div>
            }
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <span>Username: </span>
                        <input name="username" />
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <span>Password: </span>
                        <input name="password" />
                    </label>
                </fieldset>
                <button type="submit">Create User</button>
            </form>
        </div>
    )
}

export default CreateUserComponent;