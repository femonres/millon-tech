# Proyecto DevOps

Este repositorio contiene los archivos indicados en la prueba técnica.

## Estructura del repositorio

- `Dockerfile`: Archivo Docker para crear la imagen del microservicio Python.
- `1-k8s-deploy-python.yaml`: Archivo para desplegar el microservicio Python en Kubernetes.
- `2-azure-pipeline.yaml`: Pipeline de Azure DevOps para construir, probar y publicar el artefacto.
- `3-cloudflare-worker.js`: Script del Worker de Cloudflare para redimensionar y cachear imágenes.

## Configuraciones específicas

### Dockerfile

- **Base image**: `python:3.12-alpine` Se decide usar la imagen con menos vulnerabilidades.
- **Non-root user**: Ajustando a las normas OWASP se configura para usar un usuario no-root.
- **Working directory**: `/app`
- **Port exposed**: `8080`

### Kubernetes

- Namespace: `tech-prod`
- Service Name: `python-app-svc`
- Network: `internal prod` configurada mediante `NetworkPolicy` y anotación de Load Balancer interno para Azure.
- Deployment Name: `python-app-dp`
- Memory limit: `3Gi`

### Azure DevOps

- Python version: `3.x`
- Artifact name: `drop`
- Docker build step incluido.

### Cloudflare Worker

- Parámetros de imagen:
  - `width`: Ancho de la imagen (por defecto 300)
  - `height`: Alto de la imagen (por defecto 300)

## Cómo desplegar

### Kubernetes

```sh
kubectl apply -f 1-k8s-deploy-python.yaml
