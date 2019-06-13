FROM node:10

# Create that shit
WORKDIR /app

# Install that shit
COPY package*.json ./
RUN npm install

# Copy that shit
COPY . .

# Expose that shit
EXPOSE 8081

# Run that shit
CMD ["npm", "start"]
