FROM docker.io/python:3.12-alpine

RUN useradd -m appuser
USER appuser

WORKDIR /app

COPY --chown=appuser:appuser . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["python", "app.py"]