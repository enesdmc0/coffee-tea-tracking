import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');
        const beverageId = url.searchParams.get('beverageId');

        if (!userId || !beverageId) {
            return Response.json({ error: "UserId and BeverageId are required" }, { status: 400 });
        }

        const today = new Date().toISOString().split('T')[0]; // UTC date

        const { data: dailyBeverage, error: dailyBeverageError } = await supabase
            .from("consumption_logs")
            .select()
            .eq("user_id", Number(userId))
            .eq("date", today)
            .eq("beverage_id", beverageId)
            .single();

        if (dailyBeverageError) {
            if (dailyBeverageError.code === 'PGRST116') {
                // No existing record found, create a new one
                const { data: newDailyBeverage, error: createDailyBeverageError } = await supabase
                    .from("consumption_logs")
                    .insert([
                        {
                            user_id: Number(userId),
                            date: today,
                            beverage_id: beverageId,
                            count: 0,
                        },
                    ])
                    .select()
                    .single();

                if (createDailyBeverageError) {
                    console.error("Error creating daily beverage:", createDailyBeverageError);
                    return Response.json({ error: "Error creating daily beverage" }, { status: 500 });
                }

                return Response.json(newDailyBeverage, { status: 201 });
            } else {
                // An unexpected error occurred
                console.error("Error fetching daily beverage:", dailyBeverageError);
                return Response.json({ error: "Error fetching daily beverage" }, { status: 500 });
            }
        }

        // Existing record found
        return Response.json(dailyBeverage, { status: 200 });
    } catch (error) {
        console.error("Error in GET Daily Beverage:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}