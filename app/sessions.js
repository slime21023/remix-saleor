import { createCookieSessionStorage } from "@remix-run/node"; 

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: "__session",
        domain: "localhost",
        httpOnly: true,
        maxAge: 60,
        sameSite: "lax",
        secrets: ["picasso"],
        secure: true
    },
});

export { getSession, commitSession, destroySession };