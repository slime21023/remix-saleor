import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getSession, destroySession } from "../../sessions";

export async function action({ request }) {
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

export default function Logout() {
    return (
        <>
            <p>Are you sure you want to log out?</p>
            <form method="post">
                <button>Logout</button>
            </form>
            <Link to="/">Never mind</Link>
        </>
    )
}