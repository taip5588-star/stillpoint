# Social content agent team

Five agents that turn a share-psychology diagnosis into a content plan,
seed it, measure it, and feed results back to the start. Invoke each with
Claude Code's `Agent`/subagent mechanism (or just ask Claude to "use the
share-trigger-strategist agent...").

## Pipeline

```
                 ┌─────────────────────────┐
                 │ share-trigger-strategist│  ← always runs first
                 │ (ranks the 4 triggers)  │
                 └────────────┬────────────┘
                              │ trigger ranking + brief
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
  shareability-designer  save-worthy-   comment-bait-
  (send/identity/DM)     designer       engineer
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                  distribution-strategist
                  (first-hour seeding plan)
                              │
                              ▼  (post the Reel, wait ~7 days)
                  share-analytics-tracker
                  (measure shares/saves/velocity)
                              │
                              └──► back to share-trigger-strategist
                                   (revises the ranking with real data)
```

## Why it's five agents, not eight prompts

The original 8-prompt draft had three prompts (sendability, identity-
signaling, DM-share optimization) that all answer "why would someone send
this," just from different angles — run independently they tend to produce
the same generic answer three times. They're merged into
`shareability-designer`, which keeps the three angles as explicit,
non-overlapping sections instead of three separate agent calls.

The other change: `share-trigger-strategist` and `share-analytics-tracker`
are explicitly wired to hand off to each other, so the loop closes —
real performance data revises the trigger ranking instead of every Reel
starting from a fresh guess.

## Usage notes

- Every downstream agent expects the trigger ranking from
  `share-trigger-strategist` as input. Run that one first, always.
- `save-worthy-designer` and `comment-bait-engineer` are optional depending
  on which triggers actually rank highly for your niche — don't force a
  save mechanic onto content whose dominant trigger is "funny."
- Numeric benchmarks from `distribution-strategist` and
  `share-analytics-tracker` are explicitly labeled as estimates unless the
  user supplies real historical numbers — treat any specific ratio as a
  hypothesis to test, not a sourced fact.
- Default niche/audience across all agents is Stillpoint (a daily
  attention/screen-life practice — "Do nothing. On purpose."). Tell the
  agents explicitly if you want a different niche.
