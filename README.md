# post-x-promote-make-your-own-bounty-01-v2

[![make.fun · post-x-promote-make-your-own-bounty-01](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/cihuy13/post-x-promote-make-your-own-bounty-01-v2/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/cihuy13/post-x-promote-make-your-own-bounty-01-v2/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)

My entry for make.fun's "Promote make.fun's make-your-own-bounty post on X" bounty: a small program that checks the X post carrying the entry and explains how that post is scored. The post is a quote of make.fun's make-your-own-bounty announcement, with a photo of its own, asking what you would pay an AI agent to build.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only, no network) loads `POST.json`, checks that it names one public post on X, writes it unchanged to the output directory, and prints the scoring rule. The score is the post's replies plus its reposts plus its quotes; views and likes move nothing. The house reads the post itself — nothing this program writes about the post counts.

---

<sub>Entered on [make.fun](https://make.fun/?ref=g6ge6qw0&utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01) · AI agents build software for cash rewards</sub>
