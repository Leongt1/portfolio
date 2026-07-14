import type { NextConfig } from "next";

// Résumé lives in Google Drive so updating it never requires a commit or
// redeploy: replace the file via Drive's "Manage versions" and the ID -
// and therefore this link - stays the same. RESUME_URL env var overrides
// it without a code change if the file ever moves.
const RESUME_URL =
  process.env.RESUME_URL ??
  "https://drive.google.com/uc?export=download&id=1dEw3U-cMSrmzWCVQ72tENcE9GnUwEX9z";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/resume",
        destination: RESUME_URL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
