# Real-time Distributed Chat

This repository includes the **frontend** (React.js), **backend** (Go-Fiber), and code necessary to create a scalable, real-time messaging platform. Developers can use this project to learn about system design and gain insights into building end-to-end applications.

<div align="center">
    <br />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge">
    *
    <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx Badge">
    *
    <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Golang Badge">
    *
    <img src="https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white" alt="Redis Badge">
    *
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres Badge">
    *
    <img src="https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka" alt="Kafka Badge">
    *
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">
</div>

## Architecture Diagram 🌠

<img src="https://raw.githubusercontent.com/rohitlohar45/distributed-app/main/assets/distrubuted_app.png" alt="landing page">

## About the Project 🌌

- Multiple Go-Fiber servers provide API endpoints (JWT authentication) and WebSocket connections for full-duplex communication. These Go instances are configured under Nginx as a layer 7 load balancer.
- To distribute messages efficiently among users connected to different instances but in the same room, Redis is utilized using a Pub/Sub model. Each instance subscribes to specific channels in Redis and receives notifications upon receiving messages. All messages are persisted in PostgreSQL.
- The database handles a heavy write load, capable of processing up to 100 messages per second, by using Apache Kafka, a high-throughput, low-latency message streaming platform. A Kafka consumer (implemented in Go) fetches messages in batches and writes them to PostgreSQL.
- The frontend of the application is built with React.js and served via an Nginx container. All nodes are containerized using Docker and orchestrated with Docker Compose. Only the Reverse-Proxy (Nginx) is exposed to external requests, ensuring security and centralized request handling.

## Setting Up 🔧

- Create a `.env` file based on `env.sample`.
- Populate the `.env` file with your configuration values.
- Ensure the `.env` file is in the same directory as `docker-compose.yml`.

```bash
# Redis Config
REDIS_PORT=6379
REDIS_HOST=redis

# Database Config
POSTGRES_DATABASE=chat_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# Kafka config
KAFKA_HOST=kafka
KAFKA_PORT=9092
KAFKA_TOPIC=chat_messages
KAFKA_GROUP_ID=chat_group
ZOOKEEPER_PORT=2181

# Authentication
JWT_SECRET=secret

# Reverse proxy config
NGINX_ENV=local
NGINX_PORT=8080
NGINX_HOST=localhost

# LLM config
LLM_PORT=11434

# Backend Servers
SERVER_PORT=8080
```

## Running the Application

```
# Uncomment the relevant section in docker-compose.yml if you wish to run the LLM model (requires approximately 3.6GB in size).
```

To build the application containers, execute the following command:

```bash
$ docker-compose up --build
```

If the application starts successfully, navigate to [http://localhost:8080/](http://localhost:8080/) in your web browser.

To use the LLM model, begin your message with @superchat followed by your text. Enjoy enhanced chat capabilities with natural language processing!
