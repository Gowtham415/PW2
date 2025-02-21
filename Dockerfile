# Use the official Playwright image as the base
FROM mcr.microsoft.com/playwright:v1.30.0-focal

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Run Playwright install to ensure all browsers are available
RUN npx playwright install

# Command to run your tests
CMD ["npx", "playwright", "test"]
