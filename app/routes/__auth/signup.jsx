import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

export async function action({ request} ) {
    const formData = await request.formData();

    const username = formData.get("username");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeat-password");

    if (username == "" ){
        return json({ error: "Username is required" });
    }

    if (password == "") {
        return json({ error: "Password is required"});
    }

    if (password != repeatPassword) {
        return json({ error: "Repeat password need to same as password"});
    }

    // TODO CreateUser
    
    return redirect("/"); 
}

export default function Signup() {
    const errorMessage = useActionData();

    return (
        <div>
            {errorMessage ? <div className="error">{errorMessage.error}</div> : null}
            <form method="POST">
                <label>
                    Username: <input type="text" name="username" />
                </label>
                <label>
                    Password:{" "}
                    <input type="password" name="password" />
                </label>
                <label>
                    Repeat Password:{" "}
                    <input type="password" name="repeat-password" />
                </label>
                <div><input type="submit" value="註冊" /></div>
            </form>
        </div>
    )
}