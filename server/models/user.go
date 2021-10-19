package models

type User struct {
	ID string `rethinkdb:"id, omitempty" json:"id,omitempty"`
	Username string `rethinkdb:"username" json:"username"`
	Password string `rethinkdb:"password" json:"password"`
}