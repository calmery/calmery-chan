# Calmery-chan: GitHub Bot (Not GitHub Apps)

![Uchinoko Kawaii](https://img.shields.io/badge/%E3%81%86%E3%81%A1%E3%81%AE%E5%AD%90-%E3%81%8B%E3%82%8F%E3%81%84%E3%81%84-FF91BE)
[![GitHub Actions](https://github.com/calmery-chan/calmery-chan/workflows/GitHub%20Actions/badge.svg)](https://github.com/calmery-chan/calmery-chan/actions)
[![WakaTime](https://wakatime.com/badge/github/calmery-chan/calmery-chan.svg)](https://wakatime.com/badge/github/calmery-chan/calmery-chan)

![Pull Request](https://user-images.githubusercontent.com/12670155/71677298-dc891500-2dc5-11ea-8e36-962e700cb193.jpg)

## Usage

Install Node.js v12.16.1 and npm 6.14.4.

Using `now.sh` in this project. See the following documentation.<br />
[Now for GitHub - ZEIT Documentation](https://zeit.co/docs/v2/more/now-for-github)

### Commands

```bash
$ npm ci
```

```bash
$ npm run lint
$ npm start
$ npm test
```

### Set environment variables

[Environment Variables and Secrets - ZEIT Documentation](https://zeit.co/docs/v2/environment-variables-and-secrets)

```sh
$ npx now secrets add github_personal_access_token xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
> Success ! Secret github_personal_access_token added (calmery-chan)

$ npx now secrets add github_webhook_secret calmery-chan
> Success ! Secret github_webhook_secret added (calmery-chan)
```

|      Environment Variable      |                                                                                Related URL                                                                                |      Memo       |
| :----------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------: |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | [Creating a personal access token for the command line](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) | Select **repo** |
|    `GITHUB_WEBHOOK_SECRET`     |                                                 [Securing your webhooks](https://developer.github.com/webhooks/securing)                                                  |       N/A       |

### Local Development

Please execute the following command.

```bash
$ npm start
```

- [smee.io | Webhook payload delivery service](https://smee.io)
- [probot/smee-client: 🔴 Receives payloads then sends them to your local server](https://github.com/probot/smee-client)

## License

This software is released under the MIT License, see LICENSE.
