import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { mapLinkedInOAuthToResume } from "@/lib/linkedin";
import { isLinkedInServerEnabled } from "@/lib/featureFlags";
import { LinkedInProfile } from "@/types/linkedin";

export async function POST() {
  if (!isLinkedInServerEnabled()) {
    return NextResponse.json({ error: "LinkedIn import is disabled" }, { status: 503 });
  }

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accessToken = (session as any).accessToken as string | undefined;
  if (!accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 400 });
  }

  // Fetch basic profile from LinkedIn OIDC userinfo endpoint
  const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!profileRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch LinkedIn profile" },
      { status: profileRes.status },
    );
  }

  const profile = (await profileRes.json()) as LinkedInProfile;
  const data = mapLinkedInOAuthToResume(profile);

  return NextResponse.json({ data });
}
