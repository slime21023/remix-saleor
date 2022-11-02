import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession } from "../sessions";

export async function loader({request}) {
    const session = await getSession(request.headers.get("Cookie"));

    if (!session.has("userId")) { 
        return redirect("/login");
    }
    // TODO load user data
}

export default function Member() {
    return (
        <div>會員資料</div>
    )
}