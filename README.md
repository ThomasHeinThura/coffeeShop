# coffeeShop

## Domains

- Frontend: `https://coffee-shop.bimats.com`
- Backend: `https://coffee-api.bimats.com`
- APIM Gateway: `https://api.bimats.com/coffee/1`

## Credential Mapping

- Consumer Key is used as:
	- APIM subscription key (`Ocp-Apim-Subscription-Key`)
	- Asgardeo client ID for frontend login flow
- Consumer Secret is stored in `.env` as `ASGARDEO_CLIENT_SECRET` for server-side use only.
- Do not expose Consumer Secret in any `REACT_APP_*` variable.

## APIM Notes

Set API Management backend URL to:

- `https://coffee-api.bimats.com/coffee`

This matches backend routes exposed by the API service:

- `/coffee/hot`
- `/coffee/iced`

Recommended APIM mapping:

- API URL suffix: `coffee/1`
- Operations: `/hot`, `/iced`
- Full gateway URLs: `https://api.bimats.com/coffee/1/hot` and `https://api.bimats.com/coffee/1/iced`

## Docker Compose + Traefik

1. Copy env template:

```bash
cp .env.example .env
```

2. Login to the VM and go to project folder:

```bash
ssh bimdevops@enterprise-app
cd /path/to/coffeeshop
```

3. Build and start services:

```bash
docker compose up -d --build
```

4. Check containers:

```bash
docker compose ps
docker compose logs -f --tail=200
```

## Verification Commands

Backend direct domain:

```bash
curl -i https://coffee-api.bimats.com/coffee/hot
curl -i https://coffee-api.bimats.com/coffee/iced
```

APIM via gateway (with subscription key):

```bash
curl -i -H "Ocp-Apim-Subscription-Key: <YOUR_APIM_SUBSCRIPTION_KEY>" https://api.bimats.com/coffee/1/hot
curl -i -H "Ocp-Apim-Subscription-Key: <YOUR_APIM_SUBSCRIPTION_KEY>" https://api.bimats.com/coffee/1/iced
```

Frontend:

```bash
curl -I https://coffee-shop.bimats.com
```
