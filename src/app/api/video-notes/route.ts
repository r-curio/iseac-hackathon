import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';
import { google } from 'googleapis';

export async function GET(req: NextRequest) {
  try {
    const fileId = req.nextUrl.searchParams.get('fileId');
    
    if (!fileId) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    // Get the user's session
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.provider_token) {
      return NextResponse.json({ error: 'Not authenticated with Google' }, { status: 401 });
    }

    // Create OAuth2 client with the provider token
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    oauth2Client.setCredentials({
      access_token: session.provider_token
    });

    // Initialize Drive API with the authenticated client
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Get file metadata first
    const fileMetadata = await drive.files.get({
      fileId: fileId,
      fields: 'name,mimeType,size'
    });

    // Get the actual file content
    const response = await drive.files.get(
      {
        fileId: fileId,
        alt: 'media'
      },
      { responseType: 'arraybuffer' }
    );

    // Convert the file content to a Buffer
    const buffer = Buffer.from(response.data as ArrayBuffer);

    // Return the file as a downloadable response
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': fileMetadata.data.mimeType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileMetadata.data.name}"`,
      },
    });

  } catch (error) {
    console.error('Error accessing file:', error);
    return NextResponse.json(
      { error: 'Failed to access file' },
      { status: 500 }
    );
  }
}