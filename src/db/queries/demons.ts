import type { Demon } from "@prisma/client";
import { db } from "..";

export type DemonWithData = (
    Demon & {
        user: {name: string | null};
        _count: {comments: number}
    }
)

export async function fetch72Demons(): Promise<DemonWithData[]> {
  // First, fetch all demons ordered by reputation and number of comments.
  const allDemons = await db.demon.findMany({
    orderBy: [
      { reputation: 'asc' },  // Primary sorting by ascending reputation
      { comments: { _count: 'desc' } }  // Secondary sorting by descending number of comments
    ],
    include: {
      user: {
        select: {
          name: true  // Select only the name from the related user
        }
      },
      _count: {
        select: {
          comments: true  // Count the related comments
        }
      }
    }
  });

  // Determine the cutoff for the 72nd demon or more if tied.
  if (allDemons.length <= 72) {
    return allDemons;  // Return all if less than or equal to 72.
  }

  // Find the reputation and comment count of the 72nd demon.
  const reputationCutoff = allDemons[71].reputation;
  const commentCountCutoff = allDemons[71]._count.comments;

  // Include all demons with the same reputation and comment count as the 72nd, if any.
  return allDemons.filter(demon =>
    demon.reputation < reputationCutoff || 
    (demon.reputation === reputationCutoff && demon._count.comments >= commentCountCutoff)
  );
}