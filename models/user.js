import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        /* The `match` property in the `username` field of the `UserSchema` is a validation rule that
        ensures the value of the `username` field matches a specific regular expression pattern.

        ^: Asserts the start of the string.

        (?=.{8,20}$): Positive lookahead assertion. Ensures that the length of the string is between 8 and 20 characters.

        (?![_.]): Negative lookahead assertion. Ensures that the username does not start with an underscore (_) or a period (.).

        (?!.*[_.]{2}): Negative lookahead assertion. Ensures that there are no consecutive underscores (_) or periods (.) anywhere in the string.

        [a-zA-Z0-9._]+: Character class that allows alphanumeric characters, underscores (_), and periods (.). This ensures that only valid characters are allowed.

        (?<![_.]): Negative lookbehind assertion. Ensures that the username does not end with an underscore (_) or a period (.).

        $: Asserts the end of the string. */
        
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    },
});


const User = models.User || model("User", UserSchema);

export default User;