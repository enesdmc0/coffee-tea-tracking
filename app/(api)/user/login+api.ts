import { generateToken, verifyPassword } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return Response.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Check if user exists
        const { data: existingUser, error: existingUserError } = await supabase
            .from("users")
            .select("id, password, name, surname, email")
            .eq("email", email)
            .single();

        if (existingUserError) {
            console.error("Error checking existing user:", existingUserError);
            return Response.json(
                { error: "Error checking existing user" },
                { status: 500 }
            );
        }

        if (!existingUser) {
            return Response.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Check if password is correct
        const isPasswordValid = await verifyPassword(existingUser.password, password);

        if (!isPasswordValid) {
            return Response.json({ error: "Invalid password" }, { status: 401 });
        }

        const jwt_secret = process.env.JWT_SECRET;

        if (!jwt_secret) {
            return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }

        // Create JWT token
        const token = await generateToken(existingUser.id, existingUser.email)

        // Store token in SecureStore
        // await SecureStore.setItemAsync('userToken', token);


        return new Response(JSON.stringify({
            message: "Login successful",
            token,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                surname: existingUser.surname,
                email: existingUser.email,
            }
        }), { status: 200 });


    } catch (error) {
        console.error("Error during login:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}