Strapi example
This example deploys self-hosted version of Strapi. Internally it uses a PostgreSQL database to store the data.

Deploy on Railway

✨ Features
Strapi
Postgres
💁‍♀️ How to use
Click the Railway button 👆
Add the environment variables
If you choose not to add the Cloudinary related environment variables, your media will not be persisted between deploys.
💻 Developing locally
When developing locally this Strapi template will connect to the Postgres server from its public TCP Proxy

Enable the feature flag Template Service Eject in the Feature Flags menu
Within the service settings of the Strapi service click the Eject button on the upstream repository
Clone that newly created repository locally
Install Strapi's dependencies with yarn install or npm install
Install the Railway CLI
Instructions for that can be found here
If this is your first time using the CLI make sure to login with railway login
Within the local repository run railway link to link the local repository to the Strapi service on Railway
Start Strapi for development with railway run yarn run develop or railway run npm run develop
This command will run Strapi in development mode with the service variables available locally
Open your browser to http://127.0.0.1:1337/admin
📝 Notes
After your app is deployed, visit the /admin endpoint to create your admin user.
Railway's filesystem is ephemeral which is why any changes to the filesystem are not persisted between deploys. This is why, this template uses Cloudinary for media storage.
If you want to use npm with this project make sure you delete the yarn.lock file after you have ran npm install
