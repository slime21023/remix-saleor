import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getSession, commitSession } from "../../sessions";

export async function loader({ request }) {
    const session = await getSession(request.headers.get("Cookie"));

    if (session.has("userId")) {
        return redirect("/");
    }

    const data = { error: session.get("error") };
    return json(data, {
        headers: { "Set-Cookie": await commitSession(session) }
    });
}

// TODO validateCredentials
async function validateCredentials(username, password) {
    return null
}

export async function action({ request }) {
    const session = await getSession(request.headers.get("Cookie"));

    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    const userId = await validateCredentials(
        username,
        password
    );

    if (userId == null) {
        session.flash("error", "Invalid username/password");

        // Redirect back to the login page with errors.
        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    session.set("userId", userId);
    // Login succeeded, send them to the home page.
    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export default function Login() {
    const { currentUser, error } = useLoaderData();

    return (
        <div>
            {error ? <div className="error">{error}</div> : null}
            <form method="POST">
                <div>
                    <p>Please sign in</p>
                </div>
                <label>
                    Username: <input type="text" name="username" />
                </label>
                <label>
                    Password:{" "}
                    <input type="password" name="password" />
                </label>
                <div className="grid">
                    <div><input type="submit" value="登入" /></div>
                    <div><Link to="/signup"  role="button">註冊</Link></div>
                </div>
            </form>
        </div>
    )
}