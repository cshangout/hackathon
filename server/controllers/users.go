package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/mauville-technologies/hackathon/server/models"
	"net/http"
)

func GetUsers(c *gin.Context) {
	users, err := models.GetAllUsers()

	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": users})
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

	newUser, err := models.NewUser(user)
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
