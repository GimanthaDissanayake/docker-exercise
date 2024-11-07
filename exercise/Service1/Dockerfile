FROM python:3.9-slim
WORKDIR /app
RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*
RUN pip install flask requests
COPY app.py /app
CMD ["python", "app.py"]
