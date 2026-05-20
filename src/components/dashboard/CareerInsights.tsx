import { Resume } from "@/types/resume";

interface Props {
  resumes: Resume[];
}

function computeProfileScore(resumes: Resume[]): number {
  if (resumes.length === 0) return 0;
  const best = resumes.reduce((prev, cur) => {
    const score = scoreResume(cur);
    return score > scoreResume(prev) ? cur : prev;
  });
  return scoreResume(best);
}

function scoreResume(resume: Resume): number {
  const d = resume.data;
  let score = 0;
  if (d.fullName) score += 10;
  if (d.headline) score += 10;
  if (d.summary) score += 10;
  if (d.contact.email) score += 5;
  if (d.contact.phone) score += 5;
  if (d.contact.location) score += 5;
  if (d.contact.linkedin) score += 5;
  score += Math.min(d.experience.length * 10, 30);
  score += Math.min(d.education.length * 5, 10);
  score += Math.min(d.skillGroups.flatMap((g) => g.skills).length * 2, 10);
  return Math.min(score, 100);
}

export default function CareerInsights({ resumes }: Props) {
  const totalExports = resumes.reduce((sum, r) => sum + r.exportCount, 0);
  const profileScore = computeProfileScore(resumes);
  const completeCount = resumes.filter((r) => r.status === "complete").length;

  return (
    <div className="space-y-4">
      <p className="text-text-subtle mb-4 font-sans text-xs tracking-[0.2em] uppercase">
        Career Insights
      </p>

      {/* Total Exports */}
      <div className="bg-card border-border rounded-lg border p-5 shadow-sm">
        <p className="text-text-subtle mb-1 font-sans text-[10px] tracking-widest uppercase">
          Total Exports
        </p>
        <p className="text-foreground font-sans text-3xl font-bold">{totalExports}</p>
        <p className="text-muted-foreground mt-1 font-sans text-[10px]">PDFs</p>
      </div>

      {/* Profile Score */}
      <div className="bg-card border-border rounded-lg border p-5 shadow-sm">
        <p className="text-text-subtle mb-1 font-sans text-[10px] tracking-widest uppercase">
          Profile Score
        </p>
        <p className="text-foreground font-sans text-3xl font-bold">{profileScore}%</p>
        {/* Progress bar */}
        <div className="bg-border mt-2 h-px overflow-hidden rounded-full">
          <div
            className="bg-foreground h-full rounded-full transition-all duration-700"
            style={{ width: `${profileScore}%` }}
          />
        </div>
      </div>

      {/* Active Goal */}
      <div className="bg-brand-secondary rounded-lg p-5 text-white">
        <p className="mb-1 font-sans text-[10px] tracking-widest uppercase opacity-60">
          Completed Resumes
        </p>
        <p className="font-sans text-2xl font-bold">
          {completeCount} / {resumes.length}
        </p>
        <button className="mt-2 font-sans text-[10px] tracking-widest uppercase opacity-60 transition-opacity hover:opacity-100">
          View Plan →
        </button>
      </div>
    </div>
  );
}
