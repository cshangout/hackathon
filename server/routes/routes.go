package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mauville-technologies/hackathon/server/controllers"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	v1 := r.Group("/v1")
	{
		v1.GET("users", controllers.GetUsers)
	}
	return r
}