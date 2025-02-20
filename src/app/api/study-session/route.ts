import { createClient } from "@/utils/supabase/server";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { duration } = await req.json();

        console.log('Duration:', duration);
        
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const previousSession = await prismadb.session.findFirst({
            where: {
                userId: user.id,
            },
            select: {
                id: true,
                totalHr: true,
            },
        });

        if (!previousSession) {
            await prismadb.session.create({
                data: {
                    userId: user.id,
                    totalHr: duration,
                    prevTotalHr: 0,
                },
            });

            return NextResponse.json({ success: true });
        }

        if (previousSession.totalHr < duration) {
            await prismadb.session.update({
                where: {
                    id: previousSession.id,
                },
                data: {
                    totalHr: duration,
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in study session API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}