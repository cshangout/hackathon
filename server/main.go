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

	database.Config.DatabaseName = os.Getenv("DB_NAME")
	database.Config.UseHost = os.Getenv("DB_USE_HOST") == "1"


	if database.Config.UseHost {
		databaseHost := os.Getenv("DB_HOST")
		databasePort := os.Getenv("DB_PORT")
		database.Config.DatabaseURL = fmt.Sprintf("%s:%s", databaseHost, databasePort)
	} else {
		containerName := os.Getenv("DB_CONTAINER_NAME")
		database.Config.DatabaseURL = containerName
	}

	database.Session = database.Init()
	// Set up routes
	r := routes.SetupRouter()

	if err := r.Run(); err != nil {
		fmt.Println("Server stopped unexpectedly!")
	}
}