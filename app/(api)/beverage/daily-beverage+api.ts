import { supabase } from "@/lib/supabase";
// get daily tea
export async function GET(request: Request) {
    try {

        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');
        const beverageId = url.searchParams.get('beverageId');

        if (!userId) {
            return Response.json({ error: "UserId not found" }, { status: 401 });
        }

        if (!beverageId) {
            return Response.json({ error: "BeverageId not found" }, { status: 401 });
        }

        const { data: dailyBeverage, error: existingUserError } = await supabase
            .from("consumption_logs")
            .select()
            .eq("user_id", Number(userId))
            .eq("date", new Date().toISOString().slice(0, 10))
            .eq("beverage_id", beverageId)
            .single();

        if (existingUserError) {
            console.error("Error fetching daily beverage:", existingUserError);
            return new Response(JSON.stringify({ error: "Error fetching daily beverage" }), { status: 500 });
        }

        return new Response(JSON.stringify(dailyBeverage), { status: 200 });

    } catch (error) {
        console.error("Error Get Daily Beverage:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}