import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');
        const beverageId = url.searchParams.get('beverageId');

        if (!userId || !beverageId) {
            return Response.json({ error: "UserId and BeverageId are required" }, { status: 400 });
        }

        const today = new Date().toISOString().split('T')[0]; // UTC date

        // First, try to fetch existing record
        const { data: existingLog, error: fetchError } = await supabase
            .from('consumption_logs')
            .select('count')
            .eq('user_id', Number(userId))
            .eq('beverage_id', beverageId)
            .eq('date', today)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error("Error fetching consumption log:", fetchError);
            return Response.json({ error: "Error fetching consumption log" }, { status: 500 });
        }

        const newCount = existingLog ? existingLog.count + 1 : 1;

        // Upsert the record
        const { data: updatedLog, error: updateError } = await supabase
            .from('consumption_logs')
            .upsert(
                {
                    user_id: Number(userId),
                    beverage_id: beverageId,
                    date: today,
                    count: newCount
                },
                {
                    onConflict: 'user_id,beverage_id,date'
                }
            )
            .select()
            .single();

        if (updateError) {
            console.error("Error updating consumption log:", updateError);
            return Response.json({ error: "Error updating consumption log" }, { status: 500 });
        }

        return Response.json(updatedLog, { status: 200 });
    } catch (error) {
        console.error("Error in POST Increment Beverage:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}