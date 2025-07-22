# vpnhood-token-updater

A lightweight Cloudflare Worker that allows **VpnHood Manager** to securely publish a `farm-token.txt` file to the edge — and serve it publicly from a fast, global CDN.

---

## ✨ Features

- ✅ Public GET: anyone can access `/farm-token.txt`
- ✅ Authenticated POST: only authorized clients can upload/update
- ✅ Built with Cloudflare Workers + KV storage
- ✅ Compatible with VpnHood’s “Farm Token URL” publishing
- ✅ No backend server needed

---

## 🚀 Quick Deploy (via Wrangler)

```bash
npm install -g wrangler
git clone https://github.com/your-username/vpnhood-token-updater.git
cd vpnhood-token-updater
wrangler login
wrangler kv:namespace create "FARM_TOKENS"
wrangler secret put API_TOKEN
wrangler deploy
```

🔐 Security Model
Method	Endpoint	Access
GET	/farm-token.txt	Public
POST	/farm-token.txt	Bearer Token (env.API_TOKEN)

📥 VpnHood Configuration
Field	Value
Publish URL	https://vpnhood-token-updater.<user>.workers.dev/farm-token.txt
Access Token	Your API token (e.g. wF9mX38UjPYr...)
Auto Upload	POST
Headers	Authorization: Bearer {access_token}
Body	{farm_token}
