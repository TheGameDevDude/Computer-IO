FROM python:latest
COPY ./ ./computer-io
EXPOSE 8000
CMD python3 -m http.server 8000