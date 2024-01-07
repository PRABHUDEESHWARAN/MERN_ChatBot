import app from "./app.js";
import { connectToDatabase } from "./db/connections.js";
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log("server is open ✅🚀"));
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map