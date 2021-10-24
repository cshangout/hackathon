package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mauville-technologies/hackathon/server/controllers"
	"github.com/mauville-technologies/hackathon/server/middleware"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods: []string{"GET", "PUT", "POST", "DELETE"},
		AllowHeaders: []string{"Content-Type"},
	}))

	v1 := r.Group("/v1")
	{
		v1.GET("users", controllers.GetUsers)
		v1.GET("users/:id", controllers.GetUser)
		v1.POST("users", controllers.CreateUser)
		v1.PUT("users/:id", controllers.UpdateUser)
		v1.DELETE("users/:id", controllers.DeleteUser)

		v1.POST("login", controllers.Login)

		v1.GET("restricted", middleware.AuthorizeJWT(), controllers.RestrictedArea)
	}
	return r
}