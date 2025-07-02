FROM golang:1.24-alpine AS build
WORKDIR /app
COPY go.mod main.go ./
RUN go mod download
COPY . .
RUN go build -o coffee-api

FROM alpine:latest
WORKDIR /app
COPY --from=build /app/coffee-api .
EXPOSE 3000
CMD ["./coffee-api"]