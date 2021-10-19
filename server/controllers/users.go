package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/mauville-technologies/hackathon/server/models"
	"net/http"
)

func GetUsers(c *gin.Context) {
	//var users []models.User
	c.JSON(200, gin.H {
		"message": "pong",
	})
	//c.JSON(http.StatusOK, gin.H{"data": users})
}

func GetUser(c *gin.Context) {

}

func CreateUser(c *gin.Context) {
	var user models.User
	err := c.BindJSON(&user)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	newUser, err := user.NewUser()
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, newUser)
}

func UpdateUser(c *gin.Context) {

}

func DeleteUser(c *gin.Context) {

}
