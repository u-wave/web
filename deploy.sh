#!/usr/bin/env bash
set -euo pipefail

printf '\033[0;93m🤔 [WARN] Tenés que tener las keys del server para hacer esto\n'
npm run prod
ssh root@143.198.129.115 'rm -r /root/pluggo/web/packages/u-wave-web-middleware'
scp -r packages/u-wave-web-middleware root@143.198.129.115:/root/pluggo/web/packages
ssh root@143.198.129.115 "bash -c 'PATH=/root/.nvm/versions/node/v14.17.0/bin /root/.nvm/versions/node/v14.17.0/bin/pm2 restart pluggo-fe'"
