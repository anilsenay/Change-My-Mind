export const sortValues = [
  { label: "Started: New to Old", value: "started-new-to-old" },
  { label: "Started: Old to New", value: "started-old-to-new" },
  { label: "Updated: New to Old", value: "updated-new-to-old" },
  { label: "Updated: Old to New", value: "updated-old-to-new" },
  { label: "Votes: Most to Least", value: "votes-most-to-least" },
  { label: "Votes: Least to Most", value: "votes-least-to-most" },
  { label: "Popular: Most to Least", value: "popular-most-to-least" },
  { label: "Popular: Least to Most", value: "popular-lest-to-most" },
];

export const quaryValues = {
  "started-new-to-old": { orderBy: "start_date", order: "desc" },
  "started-old-to-new": { orderBy: "start_date", order: "asc" },
  "updated-new-to-old": { orderBy: "update_date", order: "desc" },
  "updated-old-to-new": { orderBy: "update_date", order: "asc" },
  "votes-most-to-least": { orderBy: "total_vote", order: "desc" },
  "votes-least-to-most": { orderBy: "total_vote", order: "asc" },
  "popular-most-to-least": { orderBy: "total_view", order: "desc" },
  "popular-lest-to-most": { orderBy: "total_view", order: "asc" },
};
