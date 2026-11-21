import type { SeoCaseStudy } from "@/lib/types";

/**
 * SEO tracking data, copied from Ubersuggest rank-tracking reports.
 * These are TRACKED KEYWORD RANKINGS — not organic traffic, inquiries,
 * sales or ROI. Keep declines and limitations visible.
 */

export const parekhSeo: SeoCaseStudy = {
  tool: "Ubersuggest rank tracking",
  reportDate: "2026-11-21",
  period: "August – October 2026",
  market: "India · Desktop",
  trackedKeywords: 25,
  averagePosition: { from: 48.38, to: 23.5 },
  movedUp: 10,
  movedDown: 0,
  top3: 3,
  examples: [
    { keyword: "best eye clinic in vikhroli", position: 1 },
    { keyword: "eye specialist near me vikhroli", position: 1 },
    { keyword: "eye hospital in vikhroli", position: 2 },
  ],
  attribution:
    "Jinal worked on this site's SEO during the tracked period. Rankings also move with search-engine updates, competitor activity and other changes, so these figures show what was tracked — not that one person's work caused every movement.",
  seoRoleConfirmed: true,
  limitations: [
    "Desktop rankings in India only; mobile rankings were not part of this report.",
    "Covers the 25 keywords chosen for tracking, not every search term the site appears for.",
    "Rank positions only — the report does not measure visits, calls or appointments.",
  ],
};

export const growSeo: SeoCaseStudy = {
  tool: "Ubersuggest rank tracking",
  reportDate: "2026-11-21",
  period: "Tracking period through 31 October 2026",
  market: "India · Desktop",
  trackedKeywords: 38,
  averagePosition: { from: 9.56, to: 6.88 },
  movedUp: 3,
  movedDown: 12,
  top3: 6,
  notRanked: 27,
  examples: [
    { keyword: "dr pranali gandhi", position: 1 },
    { keyword: "pediatrician in bodakdev", position: 2 },
    { keyword: "pediatric neurologist in ahmedabad", position: 3 },
  ],
  attribution:
    "Shown as monitoring data for a website Jinal designed and built with AI assistance. Her direct responsibility for this site's SEO has not been confirmed, so these numbers are not presented as her SEO results.",
  seoRoleConfirmed: false,
  limitations: [
    "More tracked keywords moved down (12) than up (3) in this period.",
    "27 of the 38 tracked keywords were not ranking when the report was generated.",
    "The average position is the tool's own reported figure — read it alongside the 27 unranked keywords, not instead of them.",
    "Desktop rankings in India only. Rank positions are not traffic, inquiries or revenue.",
  ],
};
