import { emailRegex } from "@/constants";
import { hashPassword } from "@/lib/auth";
import { supabase } from "@/lib/supabase";


export async function POST(request: Request) {
    try {
        const { name, surname, email, password } = await request.json();

        if (!name || !surname || !email || !password) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }


        if (!emailRegex.test(email)) {
            return Response.json(
                { error: "Invalid email format" },
                { status: 400 },
            );
        }

        if (password.length < 8) {
            return Response.json(
                { error: "Password must be at least 8 characters long" },
                { status: 400 },
            );
        }


        const { data: existingUser, error: existingUserError } = await supabase
            .from("users")
            .select("id")
            .eq("email", email);

        if (existingUserError) {
            return Response.json(
                { error: "Error checking existing user" },
                { status: 500 }
            );
        }

        if (existingUser && existingUser.length > 0) {
            return Response.json(
                { error: "Email already in use" },
                { status: 409 }
            );
        }

        const hashedPassword = await hashPassword(password);

        await supabase.from("users").insert([
            { name, surname, email, password: hashedPassword },
        ]);


        return new Response(JSON.stringify({ message: "User Created Successfully" }), {
            status: 201,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}