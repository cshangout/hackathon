package controllers

import (
	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	//var users []models.User
	c.JSON(200, gin.H {
		"message": "pong",
	})
	//c.JSON(http.StatusOK, gin.H{"data": users})
}
