FROM node:latest

WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

# Expose port 8000 (assuming React app runs on port 5000)
EXPOSE 5000

# Command to run the React app
CMD ["npm", "run", "start"]