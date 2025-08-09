# Running the Application with Dropbox Integration

## 1. Create a Dropbox App
1. Go to [Dropbox Developers Apps](https://www.dropbox.com/developers/apps)  
   (sign in to your Dropbox account if needed).
2. Click **Create app** and set up your app:
   - Choose the access type (*Scoped access*).
   - Give your app a name and finish the creation.
3. Open the **Permissions** tab and enable:
   - `files.metadata.write`
   - `files.metadata.read`
   - `files.content.write`
   - `files.content.read`
4. In the **Settings** tab, under **OAuth 2**, generate an **Access Token**.

## 2. Configure Environment Variables
In the root of the project, create or open the `.env.local` file and add:
```bash
VITE_DROPBOX_APP_ACCESS_KEY={YOUR_ACCESS_TOKEN}
```
Replace `{YOUR_ACCESS_TOKEN}` with the token you generated.

## 3. Run the Application
- **Development mode**
```bash
npm run dev
```

- **Build and start**
```bash
npm run build
npm run start
```
