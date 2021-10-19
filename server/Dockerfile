FROM golang:1.17-alpine

WORKDIR /app

COPY ./* ./
RUN mkdir build

RUN go build -o build/server

CMD ["build/server"]




