from diagrams import Diagram, Cluster
from diagrams.onprem.client import User
from diagrams.onprem.compute import Server
from diagrams.onprem.network import Nginx
from diagrams.onprem.queue import Kafka
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.inmemory import Redis
from diagrams.programming.framework import React
from diagrams.aws.ml import Sagemaker as LLMModel

with Diagram(name="Distrubuted App", show=False):

    # Frontend
    frontend = React("Frontend")

    # Backend Servers Cluster
    with Cluster("Backend Servers"):
        nginx = Nginx("Nginx Server")
        go_servers = [Server(f"Go Server {i}") for i in range(1, 4)]
        nginx >> go_servers

    # Message Queue and Model
    kafka = Kafka("Kafka Queue")
    llmodel = LLMModel("LLM Model")
    redis_pubsub = Redis("Redis Pub/Sub")

    # Connecting Backend Servers to Message Queue and Model
    for server in go_servers:
        server >> redis_pubsub

    redis_pubsub >> kafka
    redis_pubsub >> llmodel
    llmodel >> redis_pubsub

    # Batch Processing Server and Database
    batch_server = Server("Batch Go Server")
    db = PostgreSQL("PostgreSQL")

    kafka >> batch_server >> db

    # Connect Frontend to Nginx
    frontend >> nginx
