import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@/lib/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const MODULE_INFO: Record<string, { title: string; lessons: number }> = {
  'module-1': { title: 'Wat is AI?', lessons: 3 },
  'module-2': { title: 'AI Tools ontdekken', lessons: 4 },
  'module-3': { title: 'AI Slim gebruiken', lessons: 5 },
  'module-4': { title: 'AI in de les', lessons: 4 },
};

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!session.user.email.includes('@classroomatheneum.be')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('opdracht_voortgang')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ voortgang: data || [] });
  } catch (error) {
    console.error('Error in /api/admin/voortgang:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!session.user.email.includes('@classroomatheneum.be')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('opdracht_voortgang')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    const headers = ['Naam', 'Email', 'Module', 'Les', 'Type', 'Score', 'Status', 'Datum'];
    const rows = (data || []).map((v: any) => [
      v.user_name || v.user_email,
      v.user_email,
      MODULE_INFO[v.module_slug]?.title || v.module_slug,
      v.les_slug,
      v.opdracht_type,
      v.score ?? '-',
      v.status,
      new Date(v.updated_at || v.created_at).toLocaleDateString('nl-BE'),
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="voortgang-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error in CSV export:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
