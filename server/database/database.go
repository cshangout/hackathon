package database

import (
	r "gopkg.in/rethinkdb/rethinkdb-go.v6"
	"log"
)

var Session *r.Session

func getTableDefinitions() map[string]interface{} {
	return map[string]interface{}{
		"users":          "",
	}
}

func Init(db string, url string) *r.Session {
	var err error

	session, err := r.Connect(r.ConnectOpts{
		Address: url,
	})

	if err != nil {
		log.Fatalln("Failed to connect to rethinkDB: ", err)
	}

	setupDatabase(db, session)
	return session
}

func setupDatabase(db string, session *r.Session) {
	createDatabaseIfNotExists(db, session)
	createTablesIfNotExists(db, session)
}

func createDatabaseIfNotExists(db string, session *r.Session) {
	// Create database if it doesn't exist
	err := r.DB(db).TableList().Exec(session)

	if err != nil {
		log.Printf("Error retrieving database: %v", err)

		// There was an error retrieving the database, attempt to create it
		_, err = r.DBCreate(db).Run(session)

		if err != nil {
			log.Fatalf("Failed to create database %s: %v", db, err)
		}

		log.Printf("Successfully created database %s; creating tables", db)
	}
}

func createTablesIfNotExists(db string, session *r.Session) {
	for k := range getTableDefinitions() {
		if err := r.DB(db).Table(k).IndexList().Exec(session); err != nil {
			log.Printf("%s table doesn't exist, attempting to create: %v", k, err)

			err = r.DB(db).TableCreate(k).Exec(session)

			if err != nil {
				log.Fatalf("Failed to create table %s: %v", k, err)
			}
			log.Printf("Table %s successfully created!", k)
		} else {
			log.Printf("Table %s exists.", k)
		}

	}
}