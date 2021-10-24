package models

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/mauville-technologies/hackathon/server/database"
	r "gopkg.in/rethinkdb/rethinkdb-go.v6"
	"time"
)

type User struct {
	ID string `rethinkdb:"id, omitempty" json:"id,omitempty"`
	Username string `rethinkdb:"username" json:"username"`
	Password string `rethinkdb:"password" json:"password"`
}

func (u *User) MarshalJSON() ([]byte, error) {
	type Alias User
	return json.Marshal(&struct {
		Password string `json:"password,omitempty"`
		*Alias
	}{
		Password: "",
		Alias:    (*Alias)(u),
	})
}
func GetAllUsers() ([]User, error) {
	users := &[]User{}

	resp, err := r.DB(database.Config.DatabaseName).Table("users").Run(database.Session)

	if err != nil {
		return nil, err
	}

	if err = resp.All(users); err != nil {
		return nil, err
	}

	return *users, nil
}

func NewUser(u User) (*User, error) {
	// TODO: check for conflict

	// TODO: hash the password

	// Generate a UUID
	uuidResp, err := r.UUID(time.Now().String()).Run(database.Session)

	if err != nil {
		fmt.Println("Failed to generateUUID.")
		return nil, err
	}

	var row interface{}
	err = uuidResp.One(&row)

	if err != nil {
		return nil, err
	}

	uuid, ok := row.(string)

	if !ok {
		return nil, errors.New("failed to generate UUID")
	}

	u.ID = uuid
	pw, err := HashPassword(u.Password)
	if err != nil {
		return nil, err
	}

	u.Password = string(pw)
	resp, err := r.DB(database.Config.DatabaseName).Table("users").Insert(u).RunWrite(database.Session)

	if err != nil || resp.Inserted < 1 {
		return nil, err
	}

	return &u, nil
}

func DeleteUser(id string) (error) {
	resp, err := r.DB(database.Config.DatabaseName).Table("users").Get(id).Delete().RunWrite(database.Session)

	if err != nil || resp.Deleted < 1 {
		return errors.New("user doesn't exist")
	}

	return nil
}

func FindUserByID(id string) (*User, error) {

	resp, err := r.DB(database.Config.DatabaseName).Table("users").Get(id).Run(database.Session)

	if err != nil {
		return nil, err
	}

	user := &User{}

	err = resp.One(user)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func FindUserByUsername(username string) (*User, error) {
	resp, err := r.DB(database.Config.DatabaseName).Table("users").Filter(r.Row.Field("username").Eq(username)).Run(database.Session)

	if err != nil {
		return nil, err
	}

	user := &User{}

	err = resp.One(user)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func LoginUser(user User) (*User, error) {

	existingUser, err := FindUserByUsername(user.Username)
	if err != nil {
		return nil, errors.New("USER_NOT_EXIST")
	}

	if err = VerifyPassword(existingUser.Password, user.Password); err != nil {
		return nil, errors.New("INVALID_PASSWORD")
	}
	return existingUser, nil
}