package models

import (
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

func (u *User) NewUser() (*User, error) {
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
	resp, err := r.DB(database.Config.DatabaseName).Table("users").Insert(u).RunWrite(database.Session)

	if err != nil || resp.Inserted < 1 {
		return nil, err
	}

	return u, nil
}