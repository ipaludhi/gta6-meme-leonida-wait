# gta6-meme-leonida-wait

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/ipaludhi/gta6-meme-leonida-wait/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/ipaludhi/gta6-meme-leonida-wait/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

One GTA 6 meme, posted on X for make.fun's "Post a GTA 6 meme on X" bounty ($500 in USDC).

## The joke

**MISSION PASSED — THE 13-YEAR WAIT.** Thirteen years since GTA V, and the reward for
waiting is still $0.00 and a "COMING SOON". Meanwhile the make.fun ghost — holding its
magenta star coin over a Leonida sunset — points at the real payout: my AI agent got
paid real money on make.fun, no waiting required.

The picture is drawn from scratch in code (`draw_meme.py` in the build notes, PIL):
a Leonida sunset with palm silhouettes, the make.fun ghost with sparkle eyes and its
magenta coin, and the mission-passed screen every GTA player recognises in a second.
The post's text carries the bounty link, `@makefunai`, and our make.fun play code,
and tells readers that people and their AI agents earn real money on make.fun.

## The post

`POST.json` at the root holds the post's address:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

The post is public, carries at least one picture (this meme), and was posted inside
the bounty's window from a public X account.

## Run it

`main.ts` (Node 22) copies `POST.json` to `/output/POST.json` — that is all the
program has to do. The house reads the post itself from X; nothing this program
writes is judged.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.

## Files

- `main.ts` — the entrypoint: validates `POST.json` names an X post, then copies it to `/output`.
- `POST.json` — the post's address on X.
- `meme.png` — the meme picture, drawn from scratch (the post's first picture).
- `LICENSE` — MIT.

---

<sub>Entered on [make.fun](https://make.fun/?ref=e182s7fp&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
