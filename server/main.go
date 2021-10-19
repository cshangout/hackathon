package main

import (
	"fmt"
	"github.com/mauville-technologies/hackathon/server/database"
	"github.com/mauville-technologies/hackathon/server/routes"
	"os"
)

func main() {
	Run()
}

func Run() {

	// Database settings
	useHost := os.Getenv("DB_USE_HOST")

	databaseName := os.Getenv("DB_NAME")
	if useHost == "1" {
		databaseHost := os.Getenv("DB_HOST")
		databasePort := os.Getenv("DB_PORT")
		database.Session = database.Init(databaseName, fmt.Sprintf("%s:%s", databaseHost, databasePort))
	} else {
		containerName := os.Getenv("DB_CONTAINER_NAME")
		database.Session = database.Init(databaseName, containerName)
	}

	// Set up routes
	r := routes.SetupRouter()

	if err := r.Run(); err != nil {
		fmt.Println("Server stopped unexpectedly!")
	}
}