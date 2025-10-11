# MongoDB Setup Instructions

## For Windows

1. **Download MongoDB Community Server:**
   - Visit https://www.mongodb.com/try/download/community
   - Select Windows as your operating system
   - Download the latest version

2. **Install MongoDB:**
   - Run the downloaded installer
   - Choose "Complete" setup type
   - Select "Run service as Network Service user"
   - Choose default data directory (C:\Program Files\MongoDB\Server\[version]\data)
   - Complete the installation

3. **Start MongoDB Service:**
   - Open Services (services.msc)
   - Find "MongoDB Server" service
   - Right-click and select "Start"
   - Set startup type to "Automatic" to start automatically on boot

4. **Verify Installation:**
   - Open Command Prompt
   - Run: `mongo --version`
   - You should see the MongoDB version information

## For macOS

1. **Install with Homebrew:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```

2. **Start MongoDB:**
   ```bash
   brew services start mongodb-community@5.0
   ```

## For Linux (Ubuntu)

1. **Import MongoDB public GPG key:**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   ```

2. **Create list file for MongoDB:**
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   ```

3. **Update local package database:**
   ```bash
   sudo apt-get update
   ```

4. **Install MongoDB packages:**
   ```bash
   sudo apt-get install -y mongodb-org
   ```

5. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

## Manual Startup (if service doesn't work)

If you prefer to run MongoDB manually:

1. **Create data directory:**
   ```bash
   mkdir -p /data/db
   ```

2. **Set proper permissions (macOS/Linux):**
   ```bash
   sudo chown -R `id -un` /data/db
   ```

3. **Start MongoDB:**
   ```bash
   mongod --dbpath /data/db
   ```

## Verify Connection

Once MongoDB is running, you can verify the connection by:

1. Starting the backend server:
   ```bash
   cd server
   npm start
   ```

2. Checking the health endpoint:
   ```
   http://localhost:5001/health
   ```

You should see a response like:
```json
{
  "status": "OK",
  "timestamp": "2023-xx-xxTxx:xx:xx.xxxZ",
  "database": "Connected"
}
```