import app from "./app";

app.get("/.env", () => new Response(
    `STATUS = 418
STATUS_TEXT = "I'm a teapot"
ENTITY_TYPE = SHORT_AND_STOUT
MESSAGE = "\`.env\` pot is a teapot, so you couldn't get coffee from this pot."
`, {
        status: 418,
        statusText: "I'm a teapot"
    }
));
