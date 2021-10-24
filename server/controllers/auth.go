package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/mauville-technologies/hackathon/server/models"
	"github.com/mauville-technologies/hackathon/server/service"
	"net/http"
)

func Login(c *gin.Context) {
	var u models.User
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusUnprocessableEntity, "Invalid JSON provided.")
		return
	}

	user, err := models.LoginUser(u)

	if err != nil {
		c.JSON(http.StatusUnauthorized, "Invalid login details.")
		return
	}

	token := service.JWTAuthService().GenerateToken(*user)

	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}

	c.JSON(http.StatusOK, token)
}

func RestrictedArea (c *gin.Context) {
	claims, _ := c.Get("userClaims")
	c.JSON(http.StatusOK, claims)
}